
class DynamicRoolz{
  constructor(){
    //count is how many rools have been selcted
    this.count = 0;
    //a hash where each value(count at time of selection) is a key to an array of children rools, whose value is count at time of selection
    this.dependents = [];
  }
  gnuBas(val, par) {
    let attributeIn = [`<p class='dyna'>Enter the operand that the rule will be evaluating against here: </p>`,
      `<input type="text" id="operand${this.count}" name="operand" placeholder="Enter the operand here" class='dyna'></input>`,
      "<p class='dyna'>Enter the data key used to access a value in the datahash here </p>",
      `<input type="text" id="datakey${this.count}" name="datakey" placeholder="Enter your data key here" class='dyna'></input>`];
    let connect = $('#testkid' + val);

    // if rool count is 0, then this is the first rool initialized
    if (this.count < 1){
      connect.append(`<p class='dyna'>This is the first Basic Rool, and therefore the only Rool.</p>`);
      attributeIn.join();
      connect.append(attributeIn);
    }else{
      let dataSet = `<p class='hide' data-count='${this.count}' data-parent='${val}'></p>`; 
      attributeIn.unshift(dataSet); 
      attributeIn.join();

      connect.append(`<p class='dyna'>This is Rool-${this.count}. It is a child of Container Rool-${val}.</p>`);
      connect.append(attributeIn);
      this.count ++;
      let loadOpt = this.listMake(val);
      connect.append(loadOpt);
      connect.append(`<div id='testkid${this.count}' class='dyna tk'></div>`);

    }
  }

  listMake(dataCon){
    let choices = [
      `<select class="browser-default dynarool" data-count="${this.count}" data-parent="${dataCon}"><option disabled="" selected="" value=""> Choose a Rool</option>`,
      '<optgroup label="Container Rules"><option data-type="container" value="Rool::All"> Rool::All</option><option data-type="container" value="Rool::Any"> Rool::Any</option>', 
      '<option data-type="container" value="Rool::Not"> Rool::Not</option><option data-type="container" value="Rool::Iterate"> Rool::Iterate</option></optgroup>',
      '<optgroup label="Basic Rules"><option data-type="basic" value="Rool::Blank"> Rool::Blank</option><option data-type="basic" value="Rool::Email"> Rool::Email</option>',
      '<option data-type="basic" value="Rool::Equal"> Rool::Email</option><option data-type="basic" value="Rool::False"> Rool::False</option>',
      '<option data-type="basic" value="Rool::GreaterThan"> Rool::GreaterThan</option><option data-type="basic" value="Rool::Include"> Rool::Include</option>',
      '<option data-type="basic" value="Rool::LessThan"> Rool::LessThan</option><option data-type="basic" value="Rool::Regex"> Rool::Regex</option>',
      '<option data-type="basic" value="Rool::Send"> Rool::Send</option><option data-type="basic" value="Rool::Subset"> Rool::Subset</option>',
      '<option data-type="basic" value="Rool::True"> Rool::True</option></optgroup><optgroup label="Delete Rool"><option data-type="destroy" value="destroy"> Destroy Rool and Children</option></optgroup></select>'
      ];
    let answer = choices.join();

    return answer;
  }

  gnuCon(val, par) {
    this.count ++;
    let connect = $('#testkid' + val);
    if (this.count < 2) {
      let replace = this.listMake(val);
      connect.append(`<p class='dyna'>This is Container Rool-${this.count}. It is a child of Container Rool-${val}.</p>`);
      connect.append(replace);
    }else{
      let replace = this.listMake(val);
      connect.append(`<p class='dyna'>This is Container Rool-${this.count}. It is a child of Container Rool-${val}.</p>`);

      connect.append(replace);
      connect.append(`<div id='testkid${this.count}' class='dyna tk'></div>`);

      this.count ++;
      let gnuChild = this.listMake(par);
      connect.append(`<p class='dyna'>This is Container Rool-${this.count}. It is a child of Container Rool-${val}.</p>`);
      connect.append(gnuChild);
    }

    
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

  const roolOpt = new DynamicRoolz();


  $(document).on('change', '.dynarool', function(){
    console.log('change from dynarool')
    let val = $(this).closest('select').data('count');
    let par = $(this).closest('select').data('parent');
    let gnuRule = this.value;
    let gnuType = $(this).find(':selected').data('type');
    if (roolOpt.count > 0) {
      if (roolOpt.dependents[par] != null){
        roolOpt.dependents[par] = val;
      }
    }else{
      roolOpt.dependents[par] = [];
    }
    //  = this.data('rooltype');
    console.log(`gnuRule is ${gnuRule}.type is ${gnuType}.par is ${par}val is ${val}`);
    if (gnuType == 'basic') {
      roolOpt.gnuBas(par,val);
    } else {
      roolOpt.gnuCon(par,val);
    }
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