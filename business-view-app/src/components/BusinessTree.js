//this component is for the tree view where customer will be able to expand/contract a tree
///<!--<img src={"./shrink1.png"} />-->

const BusinessTree = () => {
	return (

		/// Everything inside className=rectangle is inside the rectangle
		/// You can find .ractangle in index.css
		<header>
			<h1 style = {headingStyle}>Business Processes</h1>
			<br /><br/><br/><br/><br/>
			<p className="rectangle">
			  <button>&nbsp;Expand All&nbsp;</button>&nbsp;<button>&nbsp;Contract All&nbsp;</button>
			  <br/>
			  &nbsp;&nbsp;&nbsp;
			  <button>&nbsp;-&nbsp;</button>
			  EAI Domain-1
			  <br/>
			  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			  <button>&nbsp;-&nbsp;</button>
			  Publishing Business Domain-1
			  <br/>
			  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			  <button>&nbsp;-&nbsp;</button>
			  Business Process-1
			  <br/>
			  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			  <button>&nbsp;-&nbsp;</button>
			  Business Process-1a BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2
			  <br/>
			  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			  <button>&nbsp;-&nbsp;</button>
			  Business Process-1b BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2
			  <br/>
			  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			  <button>&nbsp;-&nbsp;</button>
			  Business Process-1c BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2
			  <br/>
			  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			  <button>&nbsp;+&nbsp;</button>
			  Business Process-2
			  <br/>
			  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			  <button>&nbsp;+&nbsp;</button>
			  Publishing Business Domain-2
			  <br/>
			  &nbsp;&nbsp;&nbsp;
			  <button>&nbsp;-&nbsp;</button>
			  EAI Domain-2
			</p>
		</header>
	)
}

const headingStyle = {
	color: 'black', 
	backgroundColor: 'lightblue',
	alignitems: 'center'
}


//Export to App.js
export default BusinessTree