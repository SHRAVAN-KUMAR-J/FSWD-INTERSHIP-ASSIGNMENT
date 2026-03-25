import react from "react";
function PostCard({title, body}){
    return(
        <div>
            <h3>{title}</h3>
            <p>{body}</p>
            <hr/>
        </div>
    )
}       
export default PostCard;