{   
    function notification(a){
    new Noty({
        theme:'relax',        
        text: a,
        type:'success',
        layout:'topRight',
        timeout:1500
    
        }).show();  
}
    let createPost=function(){
       
        let newPostForm=$('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success: function(data){
                      
                        notification("post created");  
                    
                    
                   let newPost=newPostDom(data.data.post);
                   
                   $('#posts-list-container>ul').prepend(newPost);
                 
                   deletePost($(".delete-post-button",newPost) );
                   
                },error:function(error){
                    console.log(error.responseText);
                }
            }); 
        });
    }
    let newPostDom=function(post){
        return $(`<li id="post-${post._id}">
                   
        
    <small>
            <a class="delete-post-button" href="/posts/destroy/${post._id}">delete</a>

    </small>
    
    <h3 style="display: inline-block;">${post.user.name}:-</h3>
    <span>${post.content}<span>
    <div class="post-comments">
      
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="type here to comment...">
                <input type="hidden" name="post" value="${post._id}">
                <button type="submit">Add</button>
            </form>
  
    <div class="post-comments-list" >
        <ul id="post-comments-${post._id}">
        </ul>
    </div>
    </div>
    </li>`)
    }
    let deletePost=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get', 
                url:$(deleteLink).prop('href'),
                success:function(data){
                    notification("post deleted")
                    $(`#post-${data.data.post_id}`).remove();
                },error:function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
let deleter=function(){
    let all_posts=$('#posts-list-container>ul>li');
   
    for(let  i of all_posts){
        
        deletePost($(".delete-post-button",i));
        
    }
    
    return ;
}

deleter();

    createPost();

    
}
