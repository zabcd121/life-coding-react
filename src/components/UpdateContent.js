import React, {Component} from 'react';

class UpdateContent extends Component{
    render(){
        console.log(this.props.data);
        console.log('UpdateContent render');
        return (
            <article>
                <h2>Update</h2>
                <form action="/create_process" method="post"
                    onSubmit = {function(e){
                        e.preventDefault();
                        this.props.onSubmit(
                            e.target.title.value,
                            e.target.desc.value
                        );
                    }.bind(this)}
                    //form태그 안에 onSubmit이라는 이벤트를 설정해놓으면 submit버튼을 클릭했을 때 이 함수가 실행됨
                >
                    <p>
                        <input type="text" name="title" placeholder="title"></input>
                    </p>
                    <p>
                        <textarea name="desc" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit"></input>
                    </p>
                </form>
            </article>
        );
    }                                                                                                                                
}

export default UpdateContent;