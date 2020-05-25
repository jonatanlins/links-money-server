'use strict';

const Post = use('App/Models/Post');

class PostController {
  async index() {
    const posts = await Post.all();

    return posts;
  }

  async store({ request }) {
    const data = request.only(['type', 'social_id', 'post', 'page_id']);

    const post = await Post.create(data);

    return post;
  }

  async show({ params }) {
    const post = await Post.findOrFail(params.id);

    return post;
  }

  async update({ params, request }) {
    const post = await Post.findOrFail(params.id);

    const data = request.only(['link']);

    post.merge(data);
    await post.save();

    return post;
  }

  async destroy({ params }) {
    const post = await Post.findOrFail(params.id);

    await post.delete();
  }
}

module.exports = PostController;
