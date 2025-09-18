// Supabase 클라이언트 (index.html에서 초기화됨)
// const supabase = supabase.createClient(supabaseUrl, supabaseKey); // index.html에서 이미 초기화했으므로 여기서는 필요 없습니다.

// 글 작성 함수
async function addPost() {
    const postContentInput = document.getElementById('post-content');
    const content = postContentInput.value.trim();

    if (content !== "") {
        // Supabase의 'posts' 테이블에 데이터를 추가합니다.
        const { data, error } = await supabase
            .from('posts') // 테이블 이름
            .insert([
                { content: content } // content 컬럼에 값 삽입. created_at은 default로 now() 설정되어 자동 기록됩니다.
            ]);

        if (error) {
            console.error('Error adding post:', error);
            alert('글 작성 중 오류가 발생했습니다.');
        } else {
            console.log('Post added successfully:', data);
            postContentInput.value = ''; // 입력 필드 초기화
            loadPosts(); // 새 글이 추가되었으니 목록을 새로고침
        }
    } else {
        alert('글 내용을 입력해주세요.');
    }
}

// 게시글 목록을 불러와 화면에 표시하는 함수
async function loadPosts() {
    const postsList = document.getElementById('posts-list');
    postsList.innerHTML = ''; // 기존 목록 비우기

    // Supabase의 'posts' 테이블에서 데이터를 가져옵니다.
    // .order('created_at', { ascending: false }) : created_at 기준으로 내림차순 정렬 (최신글이 위로)
    const { data, error } = await supabase
        .from('posts')
        .select('*') // 모든 컬럼 선택
        .order('created_at', { ascending: false }); // 최신순으로 정렬

    if (error) {
        console.error('Error fetching posts:', error);
        postsList.innerHTML = '<li>게시글을 불러오는 중 오류가 발생했습니다.</li>';
        return;
    }

    if (data) {
        data.forEach(post => {
            const newPostItem = document.createElement('li');
            const contentParagraph = document.createElement('p');
            contentParagraph.textContent = post.content; // Supabase에서 가져온 content 내용
            newPostItem.appendChild(contentParagraph);
            postsList.appendChild(newPostItem);
        });
    }
}