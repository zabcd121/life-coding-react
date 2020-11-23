import React, {Component} from 'react';

class TOC extends Component{
    render() {
      var lists = [];
      var data = this.props.data;
      var i=0;
      while(i<data.length){
        // lists.push(
        //   <li key={data[i].id}>
        //     <a 
        //       href={"/content/"+data[i].id}
        //       // data-id = {data[i].id}
        //       //data뒤에 -로 설정한 속성은 console.log(e)해보면 target에 dataset에 id값에 전근가능
        //       onClick = {function(e){
        //         // e.target은 그것이 속한 태그를 가리킴 여기서는 a태그
        //         e.preventDefault();
        //         this.props.onChangePage(e.target.dataset.id);
        //       }.bind(this)}//bind에 넣은 두번째 매게변수는 onclick 이벤트함수안에서 첫번째 매게변수가 됨
        //       >{data[i].title}</a>
        //     </li>
        //   );
          lists.push(
            <li key={data[i].id}>
              <a 
                href={"/content/"+data[i].id}
                // data-id = {data[i].id}
                //data뒤에 -로 설정한 속성은 console.log(e)해보면 target에 dataset에 id값에 전근가능
                onClick = {function(id, e){
                  // e.target은 그것이 속한 태그를 가리킴 여기서는 a태그
                  e.preventDefault();
                  this.props.onChangePage(id);
                }.bind(this, data[i].id)}//bind에 넣은 두번째 매게변수는 onclick 이벤트함수안에서 첫번째 매게변수가 됨
                >{data[i].title}</a>
              </li>
            );
          //여러개의 엘리먼트를 자동으로 생성하는 경우 각각의 항목 리스트는 key값을 가지고 있어야 한다.
          i+=1;
      }
      return (
        <nav>
              <ul>
                  {lists}
              </ul>
          </nav>
      );
    }
  }

  export default TOC;