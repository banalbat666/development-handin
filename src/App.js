import './App.css';
import vinylData from './assets/vinyl-data.json';
import Vinyl from './components/Vinyl';
import Sort from './components/Sort';
import Filter from './components/Filter';
import { useState } from 'react';

vinylData.forEach((item) => {
	item.image = process.env.PUBLIC_URL + "/" + item.image;
});

// prints cart items, returns array of <li> elements
function PrintCart(arr) {
	let ret = [];

	for (var i = 0; i < arr.length; i++) {
		ret.push(<li id="light-text">{arr[i]}</li>);
	}

	return ret;
}

function App() {
	const [totalPrice, setTotalPrice] = useState(0);
	const [cart, setCart] = useState([]);
	const [info, setInfo] = useState(vinylData);
	const [appliedFilters, setAppliedFilters] = useState([]);
	const [sorter, setSorter] = useState("imgNum");
	const filterGroups = [
		{
			type: "genre",
			options: ["Rock", "Pop", "Hip Hop"]
		},
		{
			type: "decade",
			options: ["70s", "80s", "90s", "00s", "10s"]
		}
	];

	function sortRecords(sortType) {
		setSorter(sortType);
		// sort numerical values low to high
		setInfo((prevInfo) => [...prevInfo].sort(
			(itemA, itemB) => {return itemA[sortType] - itemB[sortType]}));
	}

	// same as sortRecords, except sorts vinylData directly (for filtering purposes)
	// instead of 'info', the copy of vinylData
	function jankSort(type) {
		vinylData.sort((itemA, itemB) => itemA[type] - itemB[type]);
	}

	// returns list of records where applied filters hold true
	function applyFilters(filters) {
		if (filters.length === 0) {
			jankSort(sorter);
			return vinylData;
		}

		let ret = [];
		jankSort(sorter);
		vinylData.forEach((record) => {
			let applies = true;

			filters.forEach((f) => {
				// conditional ensures that all selected filters apply to a given record
				// if one filter is false, 'applies' can never be set to true again
				if (record[f.filterType] !== f.option) {
					applies = false;
				}
			});
			
			if (applies) { // all selected filters apply
				ret.push(record);
			}
		})

		return ret;
	}

	function filterRecords(option, filterType) {
		let ret = [];

		// the user hasn't applied the filter yet => apply the filter
		if (!appliedFilters.some((f) => f.option === option)) {
			ret = [...appliedFilters, {option, filterType}];
		} else { // user unchecks a filter checkox => no longer apply the filter
			ret = appliedFilters.filter((elt) => elt.option !== option);
		}

		setAppliedFilters(ret);
		// set records to display to be the filtered list of records
		setInfo(applyFilters(ret));
	}

	return (
		<div className="App">
		<h1>Empire Records</h1>

		<div className="Main">
			<div className="Side">
				<div className="Side-Subsect">
					<h2 id="light-text"><u>Sort By:</u></h2>
					<Sort sortRecords={sortRecords} />
				</div>

				<div className="Side-Subsect">
					<h2 id="light-text"><u>Filter By:</u></h2>
					{filterGroups.map((group) => (
						<Filter filterGroup={group} filterType={group.type} filterRecords={filterRecords} />
					))}
				</div>

				<div className="Side-Subsect">
					<h2 id="light-text"><u>Cart:</u></h2>
					<ul>
						{PrintCart(cart)}
					</ul>
					<b><p id="light-text">Total: ${totalPrice}</p></b>
				</div>
			</div>

			<div className="Records">
				{info.map((item, index) => (
					<Vinyl name={item.name} artist={item.artist} genre={item.genre} decade={item.decade}price={item.price} cover={item.image} totalPrice={totalPrice} setTotalPrice={setTotalPrice} cart={cart} setCart={setCart} />
				))}
			</div>
		</div>
		</div>
	);
}

export default App;
