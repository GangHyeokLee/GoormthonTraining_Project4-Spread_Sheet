const spreadsheet = new (function (){
  this.column_name = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9];
  this.row_name = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

  this.createTable = () => {
    const main_container = document.getElementsByClassName('main_container')[0];
    
    //테이블 만들고 제목행과 제목열 채우기
    let table = document.createElement('table');
    table.setAttribute('id', 'spread_sheet');
    main_container.appendChild(table);

    //제목행추가
    let tr = table.insertRow(-1);
    tr.setAttribute('id', 'head_row');
    
    //th 만들기
    for(let i of this.column_name){
      let th = document.createElement('th');
      th.innerHTML = i;
      th.setAttribute('id',i+'col');
      th.setAttribute('class', 'column_head');
      tr.appendChild(th);
    }

    //td 만들기
    for(let i of this.row_name){
      //table에 한 행 추가
      tr = table.insertRow(-1);
      for(let j =0;j<this.column_name.length;j++){
        let td;
        if(j==0){
          td=tr.insertCell(-1);
          td.innerHTML = i;
          td.setAttribute('class', 'row_head');
          td.setAttribute('id', this.column_name[j]+i);
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
          td.setAttribute('id', this.column_name[j]+i);
          input.setAttribute('id', this.column_name[j]+'_'+i);
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

// 포커스 사라지면 작동하는 함수
function cellBlurred(cellId){
  const id = cellId.split('_');
  
  //색바꿔주기
  const row = document.getElementById(id[1]);
  const column = document.getElementById(id[0]+'col');

  row.setAttribute('style', 'background-color:var(--head-cell-color); color:var(--text-color)');
  column.setAttribute('style', 'background-color:var(--head-cell-color); color:var(--text-color)');
}

// CSV파일로 저장시키기
const export_button = document.getElementById('export_button');
export_button.addEventListener('click', function(){
  saveCSV('data.csv', export_button);

  
});

function saveCSV(fileName, button){
  let csv = '';

  //input 안에 있는 value를 행별로 꺼내서 ,로 join 한 뒤에 맨 마지막에 줄바꿈 표시 해주기
  for(let i of spreadsheet.row_name){
    let row = [];
    for (let j of spreadsheet.column_name){
      if(j != ''){
        row.push(document.getElementById(j + '_' + i).value);
      }

    }

    //csv 안에 다 집어넣음
    csv+=row.join(',') + '\n';
  }
  

  //csv를 blob 형태로 만들고
  csvFile = new Blob([csv], {type: 'text/csv'});

  //다운로드 하는 링크 생성
  button.setAttribute('href',window.URL.createObjectURL(csvFile));
  button.setAttribute('download',fileName);
}