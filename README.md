ReactTunes
============

##Objectives
The purpose of this project is to get you used to making AJAX requests in React, validating props, and using outside React components in your code.

This project we're going to build an iTunes Web app using React. A basic example can be found [HERE](http://reactweek.com/projects/reactTunes). 

Here's an image of the project. 
![ReactTunes](http://tylermcginnis.com/ReactWeek/react-tunes.png)

And here's one with the component layers highlighted.
![ReactTunes Highlighted](http://tylermcginnis.com/ReactWeek/react-tunes-components.png)

###Step 1: Familiarize yourself with Code
Notice, like the last project, you're given a boilerplate of code to start with. There are two files in ```app```. ```App.js``` and ```SearchItunes```. The ```App``` component is going to be responsible for keeping track of the data from iTunes and displaying that data nicely to the screen. The ```SearchItunes``` component is going to be be a bootstrapped wrapped input and select field which will go and fetch some data from iTunes. *Because this project is very bootstrappy, feel free to roll your own CSS if you'd like. I use Bootstrap for these examples as a way to quickly demonstrate the principles behind React without too much CSS getting in the way*.

One component we're going to use that is already built for us is a component called [Griddle](http://dynamictyped.github.io/Griddle/). Griddle is a simple grid component for use with React. It gives us a very convenient way to display some piece of data (in this case iTunes data) in a grid/table like manner. 

* Run ```npm install``` in your terminal to install all of the dependencies that are located in the package.json, Griddler is one of these dependencies. 

###Step 2: Search iTunes Component
* Head over to your SearchItunes.js file and set the initial state of your component to be a property of ```search``` whose value is an empty string and also another property of ```entity``` whose value is ```musicTrack```. 

The ```search``` state is going to be tied to the input box and it's eventually going to get put on the URL of the request we make to iTunes. The ```entity``` state is going to be tied to our Select field and will be the type of iTunes data the user wants to fetch (Music or Movies) and will also get tacked on to our URL of the request we make to iTunes.

* Validate that your component is receiving a ```cb``` prop and that it's a function.

This ```cb``` prop we're passing in is a callback that we'll invoke once we have the data from iTunes and it will then update the state of the ```App``` component.

* Next create an input field whose value will be the ```search``` state.
* Then create a ```handleChange``` method which will update the ```search``` state whenever a user types in the input field you just made.

Input Field
```html
<input className="form-control" type="text" value={this.state.search} onChange={this.handleChange}/>
```

handleChange method
```javascript
handleChange: function(e){
  this.setState({
   search: e.target.value
  })
}
```
* Now make your select element. It works the same as a input field so you can put on an ```onChange``` property. Then inside your select add two options with the values of ```musicTrack``` and ```movie```.
* Create a ```handleSelectChange``` method that will now be linked to the ```onChange``` property on the select element in your render. Have the ```handleSelectChange``` method update the ```entity``` state with the value from your select.

Select box
```html
 <select className="form-control" onChange={this.handleSelectChange}>
   <option value="musicTrack">Music</option>
   <option value="movie">Movies</option>
 </select>
```

Handle change method
```javascript
handleSelectChange: function(e){
  this.setState({
   entity: e.target.value
  })
 },
```

* Next what we're going to need to do is create a helper method that will return us a URL which we'll then use to make the Ajax request to iTunes.

* Create a formatURL method which will return a URL that eventually looks like this, *https://itunes.apple.com/search?term=shakira&entity=musicTrack* replacing "shakira" with the ```search``` state and replacing ```musicTrack``` with the entity state.

The last method we need to make is our handleSubmit method. This method will be tied to a button in our render method and will make the ```JSONP``` ajax request to the iTunes API to fetch some data. *If you're not familar with JSONP, here's a great Stack Overflow post on the subject. [JSONP Explained](http://stackoverflow.com/questions/2067472/what-is-jsonp-all-about)

* Make a method called ```handleSubmit``` which will get the formatted URL from the ```formatURL``` method then it will make a ```JSONP``` ajax request to the specified URL. On success, invoke the ```cb``` method on the ```props``` object passing it the ```results``` array you got from the iTunes response object. 
```javascript
handleSubmit: function(){
  var url = this.formatUrl();
    $.ajax({
      url: url,
      dataType: 'JSONP',
      error: function(error){
        console.log("Error:", error)
      },
      success: function(data){
      this.props.cb(data.results)
    }.bind(this)
  })
}
```

####Step 3: App Component
Let's now shift focus to the ```App.js``` file. This component will be where be our main wrapper for our ```SearchItunes``` component but it will also be where our ```Griddle``` grid gets rendered. 

* Set the initial state of this component to be a property of ```data``` whose value is an empty string. This will eventually be the data we get back from our ```SearchItunes``` component.
* Create an ```updateState``` method which takes in an ```info``` parameter and sets the ```data``` state to that ```info``` parameter. This is what we'll pass the ```SearchItunes``` component as its ```cb``` prop. It will be invoked when the iTunes data is ready in the ```SearchItunes``` component.

Next head down to the ```render``` method. Take note of the ```griddleMeta``` array. It's full of objects which define certain columns in our Grid. "columnName" corresponds with a property that exists on the iTunes response object. "displayName" will be what the column title says. And customComponent is a way for us to specify what we'd like the rendered HTML of that certain component to look like. Notice in the example that for "Artwork" we're rendering an image and for "Online Link" we're rendering a link. We're able to do that because of this customComponent property.

* Create an ```ImageComponent``` at the top of this file which will render an image with the "src" being the data prop which will be passed to the component.
* Create an ```UrlComponent```, also at the to of this file, which will render an anchor(link) tag whose href points to the data property on the props object and that displays ```this.props.rowData.trackName```
They'll look something like this
```javascript
var ImageComponent = React.createClass({
    render: function(){
        return (
            <img src={this.props.data} />
        )
    }
});

var UrlComponent = React.createClass({
    render: function(){
        return (
            <a href={this.props.data}>{this.props.rowData.trackName}></a>
        )
    }
});
```
For more guidance on the customComponent part of our Griddle component, check out the Griddle docs [HERE](http://dynamictyped.github.io/Griddle/customization.html#customColumns)

Last step is finishing the render method. Check out the instructions inside the file itself. 

For Griddle, here are the instructions. 
  * The Griddle component needs the following attributes.
    - results: The data it's going to put in the grid.
    - tableClassName: give this the class of "table" to apply some extra CSS.
    - columnMetadata: This is going to be the array of objects we built earlier inside the render and it's just some more config stuff for our component
    - columns: An array of the columns for our Grid. "trackName", "artistName", etc.
  You'll end up with something like this.
  ```html
  <Griddle
    results={this.state.data}
    tableClassName="table"
    columnMetadata={griddleMeta}
    columns={["trackName", "artistName", "primaryGenreName", "artworkUrl100", "trackPrice", "kind", "trackViewUrl"]}
  />
  ```
  
That's it! If you finish early, you have a few options.
  - If you've never used Firebase, go and check it out. We'll cover it tomorrow morning but it's good to get a head start on it. [Firebase](https://www.firebase.com/)
  - If you've used Firebase and you're feeling good with where you're at, check out [React Router](https://github.com/rackt/react-router) the most common way to do routing in React which we'll also cover tomorrow. 
