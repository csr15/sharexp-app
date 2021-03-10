class Story {
  constructor(id, userName, story, createdAt, views, likes, comments) {
    this.id = id;
    this.userName = userName;
    this.story = story;
    this.createdAt = createdAt;
    this.views = views;
    this.likes = likes;
    this.comments = comments;
  }
}

export default Story;
