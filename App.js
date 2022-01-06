
import React, { Component } from 'react'
import Web3 from 'web3'
import logo from './logo.svg';
import './App.css';


class App extends Component {

	state = { account: '',
		  votes: '',
		  contract: '',
		  data: '',
		  web3: '',
		  taskCount: 0,
		  tasks: [],
		  loading: true,
		  wins: 0,
		  losses: 0,
	 }
	componentWillMount(){
		this.loadBlockchainData()
	}

	async loadBlockchainData(){
		//const web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-54-184-221-155.us-west-2.compute.amazonaws.com:8545"))
		//const network = await web3.eth.net.getNetworkType()
		//console.log(network)
		//const accounts = await web3.eth.getAccounts()
		//console.log(accounts)
		//this.setState({account: accounts[0]})


		console.log('just before the connect')
		const web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-54-244-178-200.us-west-2.compute.amazonaws.com:8545"))


		this.setState({ web3 : web3 })
		//var account;
		//web3.eth.getAccounts().then((f) => {
 		//	account = f[0];
		//})
		const accounts = await web3.eth.getAccounts()
		console.log("account", accounts[0])
		console.log("account1", accounts[1])
		this.setState({ account: accounts[0] })


		const owner = accounts[0]
		const player1 = accounts[1]


		//const abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
		var config  = require('./Gaming.json');   // put a copy in /src directory.....
		// then reference as ....    -> config.abi 
		const contract = new web3.eth.Contract(config.abi);


		this.setState({ data: contract })
		this.setState({ contract: contract })



		
		// deployed via the web3 console interface...
		// more

		contract.options.address = "0x27A4A99b5Eabd0900ad158cD067df0A406a4ff08";
		contract.options.address = "0x655d2A7602722Ebba80D6483EB2043cfaB672a5A";

		contract.methods.fundGame()

		//contract.methods.fundGame({from: owner, value: web3.utils.toWei('10', 'ether')})	


    		const initialBalance = await web3.eth.getBalance(player1)
		alert("initialBalance     " + String(initialBalance));

		const initialBalanceInEther = Number(web3.utils.fromWei(initialBalance, 'ether'))
		alert("initialBalanceInEther   " + String(initialBalanceInEther));

		//   two parameters this time: ( will mystery number be higher or lower than your given umber are higher(true) or lower(false)    )
		console.log("just before first call..., passing in a '12' as the player number with bet to be higher.")


		// true:  mystery number > player
		// false: mystery number < player

        	// FIX !   I need to put in a second to get this to run! a 'call' will only perform a read and not update the blockchain
		// put in the user account address  ------ the short one , not the private key!!!!
    		//let gameRound =   await contract.methods.winOrLose(10, false).send({from: player1 }).then((f) => console.log(f))
   		//let gameRound =   await contract.methods.winOrLose(10, false).send({from: '0x0Afa9B26194b8f0752b9005D28Da8B55fFED69BE' }).then((f) => console.log(f))
  		let gameRound =   await contract.methods.winOrLose(10, false).send({from: player1 }).then((f) => console.log(f))
		gameRound =   await contract.methods.winOrLose(10, false).call(console.log)

		//0x7ee0a017020194d3ca679c2f8c2dc3cf9459e333e5a370ad79b6f33d6ccc8834

		console.log("just after the first call to winOrLose")


    		alert("gameRound A       ",gameRound   )
		let playerWins = await contract.methods.getWins().call(console.log)
		// truffle contract.deployed().then(function(contract)  {contract.wins.call().then(function(v) {console.log(v)})})		
    		alert("player stats - wins A ---> " + String(playerWins)   )

    		gameRound =   await contract.methods.winOrLose(1, false).send({from: player1 }).then((f) => console.log(f))
		gameRound =   await contract.methods.winOrLose(1, false).call(console.log)
    		alert("gameRound b   " + String(gameRound)   )
		playerWins = await contract.methods.getWins().call(console.log)		
    		alert("player stats - wins  B " + String(playerWins)   )


    		gameRound =   await contract.methods.winOrLose(5, true).send({from: player1 }).then((f) => console.log(f))
		gameRound =   await contract.methods.winOrLose(5, true).call(console.log)
		playerWins = await contract.methods.getWins().call(console.log)	
    		alert("gameRound c   " + String(gameRound)   )
		playerWins = await contract.methods.getWins().call(console.log)		
    		alert("player stats - wins  C " + String(playerWins)   )



    		gameRound =   await contract.methods.winOrLose(5, false).send({from: player1 }).then((f) => console.log(f))
		gameRound =   await contract.methods.winOrLose(5, false).call(console.log)
			playerWins = await contract.methods.getWins().call(console.log)	
    		alert("gameRound d   " + String(gameRound)   )
		playerWins = await contract.methods.getWins().call(console.log)		
    		alert("player stats - wins  d " + String(playerWins)   )

	 	playerWins = await contract.methods.getWins().call(console.log)		
    		alert("player stats - wins" + String(playerWins)   )
	    	alert(Number(playerWins)   )

		this.setState({  wins: playerWins } )
		let playerLosses = await contract.methods.getLosses().call(console.log)
    		alert("player stats - losses " + String(playerLosses)   )
		alert(playerLosses   )
		this.setState({ losses: playerLosses })

		alert ("last call")
		//alert("contract.wins", contract.wins)
		//alert("contract.losses", contract.losses)
		alert("contract.wins", playerWins)
		alert("contract.losses", playerLosses)




			// player number, (true = guess ... higher / lower) , how do i set the player / wager from the App.js ? 
//    		const gameRound = await contract.methods.winOrLose(10, true, {
//    		  from: player1,
//    		  value: web3.utils.toWei('1', 'ether')
//    		})
		alert("gameRound   "  + String(gameRound) )



	
	}
		
        test(){
		console.log("just a test")
	}







//	<button onClick={() => voteForCandidate()}> vote Again! </button>
//      <button onClick={() => this.voteForCandidate()}> vote Again! </button>


render(){
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header>
    </div>
  );
}
}
export default App;
