'use strict';

const axios = require('axios');
const Page = use('App/Models/Page');
const querystring = require('querystring');

class PageController {
  async index() {
    const pages = await Page.query()
      .with('owners')
      .with('socialButtons')
      .with('posts')
      .fetch();

    return pages;
  }

  async store({ request, auth }) {
    try {
      const { code, redirect_uri } = request.all();

      const client_id = '267533494431261';
      const client_secret = '2713ceae590192fc74352870f8b9b2a4';

      const shortLivedAuth = await axios.post(
        'https://api.instagram.com/oauth/access_token',
        querystring.stringify({
          client_id,
          client_secret,
          code,
          grant_type: 'authorization_code',
          redirect_uri,
        })
      );

      const longLivedAuth = await axios.get(
        'https://graph.instagram.com/access_token',
        {
          params: {
            grant_type: 'ig_exchange_token',
            client_secret,
            access_token: shortLivedAuth.data.access_token,
          },
        }
      );

      const instagramData = await axios.get('https://graph.instagram.com/me', {
        params: {
          fields: 'id,username,media',
          access_token: longLivedAuth.data.access_token,
        },
      });

      const posts = await Promise.all(
        instagramData.data.media.data.map(async (post) => {
          const response = await axios.get(
            `https://graph.instagram.com/${post.id}`,
            {
              params: {
                fields:
                  'id,caption,media_type,media_url,permalink,children,thumbnail_url',
                access_token: longLivedAuth.data.access_token,
              },
            }
          );

          return response.data;
        })
      );

      const instagramProfileData = await axios.get(
        `https://www.instagram.com/${instagramData.data.username}/?__a=1`
      );

      const pageData = {
        username: instagramData.data.username,
        name: instagramProfileData.data.graphql.user.full_name,
        avatar: instagramProfileData.data.graphql.user.profile_pic_url_hd,
        description: instagramProfileData.data.graphql.user.biography,
        access_token: longLivedAuth.data.access_token,
      };

      const page = await Page.create(pageData);
      await page.owners().attach([1]);
      page.owners = await page.owners().fetch();

      return page;
    } catch (error) {
      // console.log(error.response.data);
      throw error;
    }
  }

  async show({ params }) {
    const page = await Page.query()
      .where('username', params.id)
      .with('owners')
      .with('socialButtons')
      .with('posts')
      .first();

    return page;
  }

  async update({ params, request }) {
    const page = await Page.findOrFail(params.id);

    const data = request.only(['name', 'avatar', 'description']);
    const { owners } = request.all();

    page.merge(data);
    await page.save();

    if (owners && owners.length) {
      await page.owners().detach();
      await page.owners().attach(owners);
      page.owners = await page.owners().fetch();
    }

    return page;
  }

  async destroy({ params }) {
    const page = await Page.findOrFail(params.id);

    await page.delete();
  }
}

module.exports = PageController;
