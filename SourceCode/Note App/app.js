const fs =  require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const customers = require('./customers.js');

// ------------ Begin - command configuration -----------------


const idOptions = {
    describe: 'Customer Id',
    demand : true,
    alias : 'id'
}

const nameOptions = {
    describe: 'Customer Name',
    demand : true,
    alias : 'name'
}

const emailOptions = {
    describe: 'Customer Email',
    demand : true,
    alias : 'email'
}

const argv =  yargs

    .command('add','Add a new customer',{
      customer_id: idOptions,
      customer_name: nameOptions,
      customer_email:emailOptions
    })
    .command('list','List all customers')
    .command('read','Read a note',{
      customer_id: idOptions
    })
    .command('remove','Remove a customer',{
     customer_id: idOptions
    })
    .help()
    .argv;


// ------------ End - command configuration -----------------


var command = argv._[0];


if (command === 'add'){
    var customer = customers.addCustomer(argv.id,argv.name,argv.email);
    if (customer){
      customers.logCustomer(customer);
    } else{
      console.log("Customer already exists");
    }
}



else if (command === 'update') {
   var customer = customers.update(argv.id, argv.name,argv.email);
   if(customer){
    console.log("Customer Updated successfully");
          }
   else{
    console.log("Customer not found");
   }
}

else{
  console.log('command not recognized');
}
