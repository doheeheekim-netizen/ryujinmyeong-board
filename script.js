function addPost() {
    const postContentInput = document.getElementById('post-content');
    const postsList = document.getElementById('posts-list');

    const content = postContentInput.value.trim(); // 앞뒤 공백 제거

    if (content !== "") {
        // 새로운 게시글 항목 생성
        const newPostItem = document.createElement('li');

        // 게시글 내용 표시
        const contentParagraph = document.createElement('p');
        contentParagraph.textContent = content;
        newPostItem.appendChild(contentParagraph);

        // 게시글 목록에 추가
        postsList.prepend(newPostItem); // 최신 글이 위에 오도록

        // 입력 필드 초기화
        postContentInput.value = '';
    } else {
        alert('글 내용을 입력해주세요.');
    }
}