
class DynamicRoolz{
  constructor(){
    //count is how many rools have been selected
    this.count = 0;
    this.containerRoolz = '<optgroup label="Container Rules"><option data-type="container" value="Rool::All"> Rool::All</option><option data-type="container" value="Rool::Any"> Rool::Any</option><option data-type="container" value="Rool::Not"> Rool::Not</option></optgroup>'
    
    this.special = '<optgroup label="Special Rules"><option data-type="special" value="Rool::Iterate"> Rool::Iterate</option><option data-type="special" value="Rool::Send"> Rool::Send</option></optgroup>';
    this.basicRoolz = '<optgroup label="Basic Rules"><option data-type="basic" value="Rool::Blank"> Rool::Blank</option><option data-type="basic" value="Rool::Email"> Rool::Email</option><option data-type="basic" value="Rool::Equal"> Rool::Equal</option><option data-type="basic" value="Rool::False"> Rool::False</option><option data-type="basic" value="Rool::GreaterThan"> Rool::GreaterThan</option><option data-type="basic" value="Rool::Include"> Rool::Include</option><option data-type="basic" value="Rool::LessThan"> Rool::LessThan</option><option data-type="basic" value="Rool::Regex"> Rool::Regex</option><option data-type="basic" value="Rool::Subset"> Rool::Subset</option><option data-type="basic" value="Rool::True"> Rool::True</option></optgroup>'
  }

  setOnSelect(selected, roolType, roolActual){
    if (selected.hasClass('subRool')) {
      return
    }
    if (selected.hasClass('looprool')) {
      return
    }

    if (roolActual == 'Rool::Iterate'){
      this.gnuIterate(selected);
    }else if (roolType == 'basic' || roolActual == 'Rool::Send'){
      this.basicEntry(selected)
    }else{
      this.addSelect(selected);
    }
  }

  basicEntry(selected) {
    let parent = selected.data('parent');
    if (this.count > 0 && $(`#form${parent}`).length == 0){
      selected.before(`<p id='form${this.count}'>The rule form below is for Rool-${this.count}. It is a child rule of Rool-${parent}</p>`)
    }

    let gnuHtml = `<p id='b${this.count}'>Enter the data key used to access a value in the datahash here. Make sure it's in the same format as your hash above:</p><input type="text" id="datakey${this.count}" name="data_key" placeholder="Enter your data key here"></input><p id='a${this.count}'>Enter the operand that the rule will be evaluating against here: </p><input type="text" id="operand${this.count}" name="operand" placeholder="Enter the operand here"></input>`;

    if (selected.data('rool') == 'Rool::Send') {
      let sentMethod = `<p id='c${this.count}'>Enter the method that will be applied in string form here: </p><input type="text" id="mthd${this.count}" name="mthd" placeholder="Enter the method here"></input><p id='d${this.count}'>Select the Basic Rool to be applied: </p>`;

      let basic = sentMethod + `<select class='browser-default subRool' name="rool" id=sentRool${this.count}'><option disabled selected value>Choose a Rool</option`+ this.basicRoolz + '</select>'

      let gnuHtml = gnuHtml + basic;
    }
    
    

    selected.after(gnuHtml);
  } //ends basicEntry

  addSelect(selected) {
    let parent = selected.data('count');
    let grandparent = selected.data('parent');
    let col = parseInt(selected.data('col'), 10) - 1;
    let offset = 12 - col;
    this.count ++;
 
    let nextRool = `<select class='optionable browser-default' id='rool${this.count}' name="Rool" data-count='${this.count}' data-parent='${parent}' data-col='${col}' data-type='null' data-rool='null' data-basrool='null'  data-conrool='null' data-operand='null' data-key='null' data-mthd='null'><option disabled selected value>Choose a Rool</option>`;
    let lastMerge = `<optgroup label="Delete Rool"><option data-type="destroy" value="destroy"> Destroy Rool and Children</option></optgroup></select>`;

    if (col > 6){
      
      let conMerge = nextRool + this.containerRoolz;
      let basMerge = conMerge + this.basicRoolz;
      let anotherMerge = basMerge + this.special;
      let fullMerge = anotherMerge + lastMerge;
      let gnuHtml = fullMerge + `<div class="col s${col} offset-s${offset} grey lighten-5 card" id='testkid${this.count}'></div>`;
      $('#testkid' + parent).append(gnuHtml);
    }else{
      let basMerge = nextRool + this.basicRoolz;
      let gnuHtml = basMerge + lastMerge;
      $('#testkid' + parent).append(gnuHtml);
      if (col == 6 && $(`#only${parent}`).length == 0){
        selected.before(`<p id='only${parent}' class='red-text darken-4'>Due to spacing issues, you will only be able to nest Basic rool types within Rool-${parent} going forward.</p>`);
      }
    }

    if ($(`#statement${parent}`).length == 0){
      selected.before(`<p id=statement${parent}>The rule below is Rool-${parent}. It is a child of Rool-${grandparent}</p>`);
    }
    
    if ($(`#btn-for${parent}`).length == 0 ){
      $(`#statement${parent}`).after(`<button class="waves-effect waves-light btn new-child" data-id="${parent}" id="btn-for${parent}" type="button">Add Child Rule for Rool-${parent}</button>`);
    }
   
  } //ends addSelect

  gnuIterate(selected){
    let parent = selected.data('parent');

    let initial = `<p id='f${this.count}'>Enter the data key used to access a value in the datahash here. Make sure it's in the same format as your hash above:</p><input type="text" id="datakey${this.count}" name="data_key" placeholder="Enter your data key here"></input><p id='a${this.count}'>Enter the operand that the rule will be evaluating against here: </p><input type="text" id="operand${this.count}" name="operand" placeholder="Enter the operand here"></input><p id='g${this.count}'>Select the Basic Rool to be applied: </p>`;

    let basic = initial + `<select class='browser-default subRool' name="bas_rool" id='sentRool${this.count}'><option disabled selected value>Choose a Rool</option>` + this.basicRoolz + `</select><p id='h${this.count}'>Select the Container Rool to be applied: </p>`;
    
    let gnuHtml = basic + `<select class='browser-default looprool' name="con_rool" id='looprool${this.count}'><option disabled selected value>Choose a Rool</option>` + this.containerRoolz + '</select>';
    
    if (this.count > 0){
      if ($(`#form${parent}`).length == 0){
        selected.before(`<p id='form${this.count}'>The rule form below is for Rool-${this.count}. It is a child rule of Rool-${parent}</p>`)
      }
      if ($(`#btn-for${parent}`).length == 0 ){
        $(`#form${parent}`).after(`<button class="waves-effect waves-light btn new-child" data-id="${parent}" id="btn-for${parent}" type="button" >Add Child Rule for Rool-${parent}</button>`);
      }
    }

    selected.after(gnuHtml);
  } //ends gnuIterate



  destroy(selected, type) {
    let id = selected.data('count');
    let defi = selected.data('rool');
    let parent = $(`#rool${selected.data('parent')}`);

    if (type == 'destroy') {
      if (defi == undefined){
        alert("You can't destroy a rule that hasn't been selected!");
      }else if(confirm(`By selecting destroy, Rool-${selected.data('count')}, and all of it's children, and their data, will be destroyed. Are you sure you want to continue?`)) {
        $(`#testkid${id}`).remove();
        let doomedArray = [$(`#statement${id}`), $(`#btn-for${id}`), $(`#form${id}`), $(`#operand${id}`), $(`#datakey${id}`), $(`#testkid${id}`), $(`#a${id}`), $(`#b${id}`), $(`rool${id}`),
          $(`#c${id}`), $(`#d${id}`),$(`#e${id}`), $(`#f${id}`), $(`#g${id}`), $(`#h${id}`), $(`#sentRool${id}`), $(`#mthd${id}`), $(`#looprool${id}`), $(`#only${id}`) ];

        for (var i =  doomedArray.length - 1; i >= 0; i--) {
          doomedArray[i].remove();
        }

        selected.remove();
      }
    }else{
      alert("Sorry, once a rule has been selected, it cannot be changed. Choose the 'Destroy' option from the menu to make another selection");
    }
  } //ends destroy
}


function hashCursion(multiArr, modArr, index){
    
  console.log('in main recursion. index is ' + index);  
    
  for (var i = index; i < multiArr.length; i++) {
    let name = multiArr[i].name;
    let val = multiArr[i ].value;
    console.log('first level of hash loop. i is ' + i)

    if (name == 'Rool') {
      let gnuname = val + i
      modArr[gnuname] = []
      if (val != 'Rool::Any' && val != 'Rool::All' && val != 'Rool::Not'){
        console.log('inside basic sender. index is ' + index + ' and i is ' + i)
        i ++
        modArr[gnuname].push(basCursion(multiArr, i))
      }else{
        let gnuLoop = {}
        i++;
        modArr[gnuname].push(hashCursion(multiArr, gnuLoop, i))
      }
    }
      
  }
  return modArr
}

function basCursion(multiArr, index){
  let basAttr = {}
  let name = multiArr[index].name;
  let val = multiArr[index - 1].value;

  console.log('in basic recursion. val is ' + val)
  for (var k = 0; k < 4; k++) {
    let s = index + k;
    console.log("s is " + s + ' k is ' + k)
    basAttr[multiArr[s].name] = multiArr[s].value;
    if (k == 1 && val != 'Rool::Iterate' && val != 'Rool::Send') {
      return basAttr;
    }
    console.log('val is ' + val + " basAttr is below")
    console.log(basAttr)
  }
  return basAttr;
}




$(document).ready(function(){
  $('.collapsible').collapsible();
  $('select').material_select();
  
  //initializes a DynamicRoolz instance on page ready. DynamicRoolz handles the majority of the functionality for the UI and UX
  const roolOpt = new DynamicRoolz();
  
  $(document).on('change', 'select', function(){
    let selected = $(this).closest('select');
    
    let type = $(this).find(':selected').data('type');
    let rool = this.value;
    if (selected.data('rool') != undefined || type == 'destroy') {
      roolOpt.destroy(selected, type);
      return
    }
    roolOpt.setOnSelect(selected, type, rool);
    selected.addClass('purple-text darken-4');
  });

  $(document).on('click', '.new-child', function(){
    let id = $(this).data('id');
    let parent = $(`#rool${id}`);
    roolOpt.addSelect(parent);
    console.log(id);
  });

  $(document).on('submit', function(e){
    e.preventDefault();
    let formData = $('form').serializeArray();
    let dataHash = formData.shift();
    console.log(formData);
    console.log(dataHash);
    let gunny = {};
    hashCursion(formData, gunny, 0)
    funny = JSON.stringify(gunny);
    console.log(funny);
    return gunny;
    
  });

  

});

