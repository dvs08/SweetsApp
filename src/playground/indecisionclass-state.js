//REACT: MAKING THE INDECISION APP USING COMPONENTS
//COMPONENTS ARE BASICALLY THE CLASSES THAT EXTEND SOMETHING (REACT>COMPONENTS CLASS) CREATED FOR INDIVIDUAL COMPONENTS IN A WEBSITE. Eg) Header, Footer, etc.

//Prop: Passing data in when we initialize an instance of our component. Same as setting up attributes in htmls, eg ID, class name etc.
 
/*Component State: Allows our components to manae some data. In this, all we do is manipulate the data and the component is going to take care 
of re-rendering itself.

*/

/*changing it to using as states*/


class IndecisionApp extends React.Component{

    constructor(props){

        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this); //binidng handleDeleteOption to the constructor
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {

            options: []

        };
    }

    handleDeleteOptions(){    //handleDeleteOptions

        this.setState(() =>{

            return{

                options: []
            };
        });
    }

    handlePick(){

        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }

    handleAddOption(option){

        //validation

        if(!option){  //empty string

            return 'Enter valid value to add item';

        } else if(this.state.options.indexOf(option)> -1){  //item already exists

            return 'This option already exists';

        }

        this.setState( (prevState) =>{

            return {
                options: prevState.options.concat([option])  //adding to options array
            }; 

        });
    }
 
    render(){

        const title1 = 'Indecision';       
        const subtitle = 'Put your life in the hands of a computer';

        return(
            
            <div>
                <Header title={title1} subtitle = {subtitle}/>  {/*react component getting rendered. WE passed a prop called Title who is a string test value*/}
                <Action hasOptions={this.state.options.length > 0} handlePick = {this.handlePick}/> {/*Using class name as script tag. Must be upper letter as that's how React classifies components */}
                <Options options={this.state.options} handleDeleteOptions={this.handleDeleteOptions} />
                <AddOption handleAddOption ={this.handleAddOption}/>
            </div>


        );
    }
}


class Header extends React.Component{  //converting header class from class to a react compent. We extend using React Component which is also a class which gives all the features of react. WHich is a global tag

    render(){ //React components requires one method to be defiend, this is a special method called Render().

       // console.log(this.props);  //prints the title: test Value prop
        // //this.props.title = 'A';
        // let {title} = this.props;
        // title = 'title.lowerCase()';
       // console.log(title);

        return (           //returning the jsx

            <div>

                {/* <h1>Indecision</h1> */}
                <h1>{this.props.title}</h1>   {/* same as abve, accessing by using props */}
                <h2>{this.props.subtitle}</h2>
            </div>
        );

    }           

}

class Action extends React.Component {
    
    render(){
        
        return (
                /* 'this' points to the component class instance */
            <div>
                <button 
                onClick={this.props.handlePick}          
                disabled={!this.props.hasOptions}    
                >
                    What should I do?
                </button>  
            </div>

        );

    }
}

//Challenge: 
//Options -> Options components here
// AddOption -> Addoption coponent here


//challenge: Setup options prop for optoions component
//render the length of the array


//Challenge: render new p tag for each option (set text, set key)

//Chaleng: add remove all button. Setup handleRemoveAll -> alert some message and setup onClick handler to fire the method

class Options extends React.Component{
    //     constructor(props){  //same prop as in render function

    //         super(props);             //we call props to have access to this.props
    //         this.handleRemoveAll = this.handleRemoveAll.bind(this);  //bind is used to set the 'this' context of a method to a specific object
    //     }


    // handleRemoveAll(){

    //     console.log(this.props.options);
    // }

    render(){

        return(

            <div>
                
                <button onClick={this.props.handleDeleteOptions}>Remove All</button>
                {/* {this.props.options.length}    
                <Option/>            Nesting components */}

                {
                    this.props.options.map((option) => <Option key={option} optionText = {option}></Option>)  //rendering Option in Options 
                }
            </div>
        );

    };
}

class Option extends React.Component{


    render(){

        return(
            
            <div>
                
               {this.props.optionText}
            </div>


        );
    }
}


//CHallenge: Setup form with text input and submit button
// wire up onSubmit
// handleAddOption -> fetch the value typed, if value then alert

class AddOption extends React.Component{ //we are using 'this' so set up a constructor

    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {

            error: undefined
        };
    }

    handleAddOption(e){
        
        e.preventDefault();  //prevents default form submission process

        const trg = e.target.elements.option.value.trim(); //trim just removes extra space
        const error = this.props.handleAddOption(trg);

        this.setState(() =>{

            return{

                error               //same as error:error
            };
        });

    }

    render(){

        return(

            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>

                    <input type="text" name = "option"></input>
                    <button>Add option</button>

                </form>
            </div>
        );

    }
}
 
// const jsx = (                     //Object JSX

//     <div>
//         <h1>Title</h1>
//         <Header/>                   
//         <Action/>                 
//         <Options></Options>
//         <AddOption/>
//     </div> 

// );

ReactDOM.render(<IndecisionApp/>, document.getElementById('app'));  //rendering a react component instead of jsx














