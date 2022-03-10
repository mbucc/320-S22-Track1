//this component is for the tree view where customer will be able to expand/contract a tree
///<!--<img src={"./shrink1.png"} />-->
import './BusinessTree.css'

const BusinessTree = () => {
	const headingStyle = {
		color: 'black', 
		backgroundColor: 'lightblue',
		alignitems: 'center'
	}
	
	return (
		<div>
			<h1 style = {headingStyle}>Business Processes</h1>
			<br /><br/><br/><br/><br/>
			<div className="rectangle">
				<div>
				    <button>Expand All</button>
				    <button>Contract All</button>
				</div>
			    <ul id="myUL">
			  	    <li><span className="caret">EAI Domain-1</span>
			  		    <ul className="nested">
						    <li><span className="caret">Publishing Business Domain-1</span>
							    <ul className="nested">
								    <li><span className="caret">Business Process-1</span>
									    <ul className="nested">
										    <li>Business Process-1a BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value2</li>
										    <li>Business Process-1b BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value2</li>
										    <li>Business Process-1c BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value2</li>
									    </ul>
								    </li>
								    <li><span className= "caret">Business Process-2</span>
								    </li>
							    </ul>
						    </li>
						    <li><span className="caret">Publishing Business Domain-2</span>
						    </li>
					    </ul>
			  	    </li>
				    <li><span className="caret">EAI Domain-2</span>
				    </li>
			    </ul>
			</div>
		</div>
		
	)
}

    var toggler = document.getElementsByClassName("caret");
	var i;
	
	for (i = 0; i < 30; i++) {
	  toggler[i].addEventListener("click", function() {
		this.parentElement.querySelector(".nested").classList.toggle("active");
		this.classList.toggle("caret-down");
	  });
	} 

export default BusinessTree