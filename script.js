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
      th.setAttribute('class', 'column_head');
      tr.appendChild(th);
    }

    //td 만들기
    for(let i of this.column_name){
      //table에 한 행 추가
      tr = table.insertRow(-1);
      for(let j =0;j<this.row_name.length;j++){
        let td;
        if(j==0){
          td=tr.insertCell(-1);
          td.innerHTML = i;
          td.setAttribute('class', 'row_head');
          td.setAttribute('id', this.row_name[j]+i);
        }else{
          td = document.createElement('td');
          tr.appendChild(td);
          let input = document.createElement('input');
          input.setAttribute('type', 'text');
          input.addEventListener('focus', function(e){
            cellFocused(input.id);
          });
          input.addEventListener('blur', function(){
            cellBlurred(input.id);
          });
          td.appendChild(input);
          input.setAttribute('id', this.row_name[j]+'_'+i);
          input.setAttribute('class', 'cells');
        }
        
      }
      tr.setAttribute('id', i+'row');
    }
  };
});

spreadsheet.createTable();

function cellFocused(cellId){
  const id = cellId.split('_');

  //행과 열번호 찾기
  const row = document.getElementById(id[1]);
  const column = document.getElementById(id[0]+'col');

  //색깔 바꾸기
  row.setAttribute('style', 'background-color:var(--head-cell-color-selected); color:var(--text-color-selected)');
  column.setAttribute('style', 'background-color:var(--head-cell-color-selected); color:var(--text-color-selected)');


  //표 위의 Cell에 보이기
  const cell = document.getElementById('cell_name');
  cell.innerHTML='Cell: '+ id[1]+id[0];
}

function cellBlurred(cellId){
  const id = cellId.split('_');
    
  const row = document.getElementById(id[1]);
  const column = document.getElementById(id[0]+'col');

  row.setAttribute('style', 'background-color:var(--head-cell-color); color:var(--text-color)');
  column.setAttribute('style', 'background-color:var(--head-cell-color); color:var(--text-color)');
}