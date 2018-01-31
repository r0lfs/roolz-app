
class DynamicRoolz{
  constructor(){
    //count is how many rools have been selected
    this.count = 0;
    this.containerRoolz = '<optgroup label="Container Rules"><option data-type="container" value="Rool::All"> Rool::All</option><option data-type="container" value="Rool::Any"> Rool::Any</option><option data-type="container" value="Rool::Not"> Rool::Not</option><option data-type="container" value="Rool::Iterate"> Rool::Iterate</option></optgroup>'
    

    this.basicRoolz = '<optgroup label="Basic Rules"><option data-type="basic" value="Rool::Blank"> Rool::Blank</option><option data-type="basic" value="Rool::Email"> Rool::Email</option><option data-type="basic" value="Rool::Equal"> Rool::Email</option><option data-type="basic" value="Rool::False"> Rool::False</option><option data-type="basic" value="Rool::GreaterThan"> Rool::GreaterThan</option><option data-type="basic" value="Rool::Include"> Rool::Include</option><option data-type="basic" value="Rool::LessThan"> Rool::LessThan</option><option data-type="basic" value="Rool::Regex"> Rool::Regex</option><option data-type="basic" value="Rool::Send"> Rool::Send</option><option data-type="basic" value="Rool::Subset"> Rool::Subset</option><option data-type="basic" value="Rool::True"> Rool::True</option></optgroup>'
  }

  setOnSelect(selected, roolType, roolActual){
    selected.data('rool',roolActual);
    selected.data('type', roolType);
    if (roolActual == 'Rool::Iterate'){
      this.gnuIterate(selected);
    }else if (roolType == 'basic'){
      this.basicEntry(selected)
    }else{
      this.addSelect(selected);
    }
  }

  basicEntry(selected) {
    let parent = selected.data('parent');

    let gnuHtml = `<p>Enter the operand that the rule will be evaluating against here: </p><input type="text" id="operand${this.count}" name="operand" placeholder="Enter the operand here"></input><p>Enter the data key used to access a value in the datahash here. Make sure it's in the same format as your hash above:</p><input type="text" id="datakey${this.count}" name="datakey" placeholder="Enter your data key here"></input>`;

    if (selected.data('rool') == 'Rool::Send') {
      let sentMethod = `<p>Enter the method that will be applied in string form here: </p><input type="text" id="mthd${this.count}" name="method" placeholder="Enter the method here"></input><p>Select the Basic Rool to be applied: </p>`;

      let basic = sentMethod + `<select class='browser-default' class='subRool' id=sentRool${this.count}'><option disabled selected value>Choose a Rool</option`+ this.basicRoolz + '</select>'

      gnuHtml = gnuHtml + basic;
    }

    if (this.count > 0){
      if ($(`#form${parent}`).length == 0){
        selected.before(`<p id='form${this.count}'>The rule form below is for Rool-${this.count}. It is a child rule of Rool-${parent}</p>`)
      }
      if ($(`#btn-for${parent}`).length == 0 ){
        $(`#form${parent}`).after(`<button class="waves-effect waves-light btn new-child" data-id="${parent}" id="btn-for${parent}">Add Child Rule for Rool-${parent}</button>`);
      }
    }

    selected.after(gnuHtml);
  }

  addSelect(selected) {
    let parent = selected.data('count');
    let grandparent = selected.data('parent');
    let col = parseInt(selected.data('col'), 10) - 1;
    let offset = 12 - col;
    this.count ++;

    let nextRool = `<select class='browser-default' id='rool${this.count}' data-count='${this.count}' data-parent='${parent}' data-col='${col}' data-type='null' data-rool='null' data-basrool='null'  data-conrool='null' data-operand='null' data-key='null' data-mthd='null'><option disabled selected value>Choose a Rool</option>`;
    let lastMerge = `<optgroup label="Delete Rool"><option data-type="destroy" value="destroy"> Destroy Rool and Children</option></optgroup></select>`;

    if (col > 7){
      console.log('got into greater than 7');
      let conMerge = nextRool + this.containerRoolz;
      let basMerge = conMerge + this.basicRoolz;
      let fullMerge = basMerge + lastMerge;
      let gnuHtml = fullMerge + `<div class="col s${col} offset-s${offset}" id='testkid${this.count}'></div>`;
      $('#testkid' + parent).append(gnuHtml);
    }else{
      let basMerge = nextRool + this.basicRoolz;
      let gnuHtml = basMerge + lastMerge;
      $('#testkid' + parent).append(gnuHtml);
      if (col == 7){
        alert(`Due to spacing issues, you will only be able to nest Basic rool types within Rool-${parent} going forward.`);
      }
    }

    if ($(`#statement${parent}`).length == 0){
      selected.before(`<p id=statement${parent}>The rule below is Rool-${parent}. It is a child of Rool-${grandparent}</p>`);
    }
    
    if ($(`#btn-for${parent}`).length == 0 ){
      $(`#statement${parent}`).after(`<button class="waves-effect waves-light btn new-child" data-id="${parent}" id="btn-for${parent}">Add Child Rule for Rool-${parent}</button>`);
    }


    
  }

  gnuIterate(parent){

  }



  destroy(kids) {
    kids.children().remove();
    this.basCount = 1;
    this.conCount = 0;
  }
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
    console.log($(this).not('.subRool'));
    roolOpt.setOnSelect(selected, type, rool);
  })

  $(document).on('click', '.new-child', function(){
    let id = $(this).data('id');
    let parent = $(`#rool${id}`);
    roolOpt.addSelect(parent);
    console.log(id);
  })

});

  
  // $('.start-rule').change(function(){
  //   console.log($('.input-field').children('.testkid'));
  //   let par = $('.input-field').children('.testkid');
  //  if (initialRule) {
  //    if (confirm(`You have already selected ${initialRule} as your starting rule type. Are you sure you want to change it to ${this.value}? Doing so will cause all form data to be lost`)) {
  //      initialRule = this.value;
  //      initialType = $(this).find(':selected').data('type');
  //      console.log(`initialRule is now ${initialRule}. Type is now ${initialType}.`);
  //    }
  //  } else {
  //    initialRule = this.value;
  //    initialType = $(this).find(':selected').data('type');
  //    //  = this.data('rooltype');
   //    console.log(`initialRule is ${initialRule}.type is ${initialType}.`);
   //  }
   //  if (initialRule != oldVal){
  //     console.log('it changed');
  //     oldVal = initialRule;
  //     roolOpt.destroy();
  //     $('#inform').show();
  //     if (initialType == 'basic') {
  //       roolOpt.gnuBas($(par));
  //     } else {
  //       roolOpt.gnuCon($(par));
  //       console.log('guncon werked from initial')
  //     }
   //  }
  // })