const spreadsheet = new (function (){
  this.row_name = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9];
  this.column_name = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

  this.createTable = () => {
    const main_container = document.getElementsByClassName('main_container')[0];
    
    //테이블 만들고 제목행과 제목열 채우기
    let table = document.createElement('table');
    table.setAttribute('id', 'spread_sheet');
    main_container.appendChild(table);

    //제목행추가
    let tr = table.insertRow(-1);
    
    //th 만들기
    for(let i of this.row_name){
      let th = document.createElement('th');
      th.innerHTML = i;
      th.setAttribute('id',i+'col');
      tr.appendChild(th);
    }

    //td 만들기
    for(let i of this.column_name){
      //table에 한 행 추가
      tr = table.insertRow(-1);
      for(let j =0;j<this.row_name.length;j++){
        let td = tr.insertCell(-1);
        if(j==0){
          td.innerHTML = i;
        }
        td.setAttribute('id', this.row_name[j]+i);
      }
      tr.setAttribute('id', i+'row');
    }
  };
});

spreadsheet.createTable();