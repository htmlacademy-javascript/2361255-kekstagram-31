//создаем шаблон для комментария
const createCommentTemplate = (({ avatar, name, message }) => {
  const comment = document.createElement('li');

  comment.innerHTML = (
    `<li class="social__comment">
      <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
      <p class="social__text">${message}</p>
    </li>`
  );

  return comment;
});


const createCommentsFragment = (comments) => {
  //создаем фрагмент
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => commentsFragment.appendChild(createCommentTemplate(comment)));
  // Возвращаем комментарии
  return commentsFragment;
};


export { createCommentsFragment };
