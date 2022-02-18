{   function notification(a){
    new Noty({
        theme:'relax',        
        text: a,
        type:'success',
        layout:'topRight',
        timeout:1500
    
        }).show();  
}
    let createComment=function(){
        let all_posts=$('#posts-list-container>ul>li');
       for(let i of all_posts){
        let newCommentForm=$('#new-comment-form',i);
        newCommentForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/comments/create',
                data:newCommentForm.serialize(),
                success: function(data){
                     
                        notification(data.message);  
                    
                    
                   let newComment=newCommentDom(data.data.comment);
                   let post_con=$(`#post-${data.data.post_id}`);
                   $(`#post-comments-${data.data.post_id}`,post_con).prepend(newComment);
                   deleteComment($(".delete-comment-button",newComment));
                  
                },error:function(error){
                    console.log(error.responseText);
                }
            }); 
        }); 
    }}

let newCommentDom=function(comment){
    let post=comment.post;
    return $(`<li id="comment-${comment._id}" >${comment.content}:  ${ comment.user.name}
    
    <small>
              
              <a class="delete-comment-button" href="/comments/destroy/${comment._id}/${post.user._id}">delete</a>
          
    </small>
   
    </li>`
    
    ) 
}
let deleteComment=function(deleteLink){
     
    $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get', 
                url:$(deleteLink).prop('href'),
                success:function(data){
                   
                    notification(data.message)
                    $(`#comment-${data.data.comment._id}`).remove();
                },error:function(error){
                    console.log(error.responseText);
                }
            })
        })
    
}
let deleter=function(){
    let all_comments=$('#posts-list-container>ul>li');
   let comment_container=$('.post-comments-list',all_comments);
    for(let  i of comment_container){
        let list=$('li',i);
       
        for(let j of list){
            console.log(j);
        deleteComment($(".delete-comment-button",j));
        
    }

}
    
    return ;
}




deleter();

createComment();

}