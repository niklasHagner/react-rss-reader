const eventNames = {
  SELECT_ARTICLE: 'select article',
  EDIT_FEEDS: 'edit feeds',
};

const events = {
  selectArticle: {
    name: eventNames.SELECT_ARTICLE
  },
  editMode: {
    name: eventNames.EDIT_FEEDS
  }
}

function triggerEvent(name, data, target = document) {
  console.log(`dispatching event '${name}' with data:`, data);

  var event = new CustomEvent(name, {detail: data});
  target.dispatchEvent(event);
}

export { events, triggerEvent };
