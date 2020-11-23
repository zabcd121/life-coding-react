import React, {Component} from 'react';

class Subject extends Component{
    //class안에 생성된 함수는 function생략가능
    render(){
      return (
        <header>
              <h1><a href="/" onClick={function(e){
                e.preventDefault();
                this.props.onChangePage();
              }.bind(this)}>{this.props.title}</a></h1>
              {this.props.sub}
          </header>
      );
    }
  }

  export default Subject;