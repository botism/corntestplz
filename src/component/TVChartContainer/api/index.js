import historyProvider from './historyProvider'
import stream from './stream'

import {Symbols as BinanceSymbols} from "../../../data/sockets/Symbols"

const supportedResolutions = ["1", "2", "3", "5", "7", "9", "10", "15", "20", "30", "45", "60", "120", "240", "360", "720", "D", "2D", "3D"]

const config = {
    supported_resolutions: supportedResolutions,
	supports_search: true,
	symbols_types: [
		{
			name: "bitmex",
			value: "bitmex"
		},
		{
			name: "locked",
			value: "locked"
		}
	]
};


export default {
	onReady: cb => {
	// console.log('=====onReady running')
		setTimeout(() => cb(config), 0)

	},
	searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
		// console.log('====Search Symbols running' + userInput + exchange + symbolType)

		var result = []

		function addResult(symbol, exchange, description, ticker = '') {
			result.push(
				{
					"symbol":symbol,
					"full_name": symbol + " " + exchange,
					"description": description,
					"exchange": "",
					"ticker": ticker,
					"type": exchange
				}
			)

		}


		if (symbolType==="binance") {

			// addResult("BTC-USDT", "binance", "bitcoin/tether")
			//
			//
			// addResult("AMB-BTC", "binance", "amb/bitcoin")
			//
			// // addResult("XMR-USDT", "binance", "monero/tether")
			//
			// addResult("XRP-BTC", "binance", "ripple/bitcoin")
			// addResult("XRP-USDT", "binance", "ripple/tether")



			let symbols = BinanceSymbols.symbols


			let comparee = (a, b) => {
				const genreA = a.id.toUpperCase();
				const genreB = b.id.toUpperCase();

				let comparison = 0;
				if (genreA > genreB) {
					comparison = 1;
				} else if (genreA < genreB) {
					comparison = -1;
				}
				return comparison;
			}

			symbols = symbols.sort(comparee)

			symbols = symbols.filter((s)=>{return (s.id.includes('BTC')||s.id.includes('USDT')||s.id.includes('PAX'))})

			console.log("symbols:")
			console.log(symbols)


			symbols.forEach((symbol)=>{
				addResult(symbol.symbol.replace('/','-'), "binance", symbol.id)
			})


			// addResult("NEO-BTC", "binance", "NEO/bitcoin")
			// addResult("NEO-USDT", "binance", "NEO/tether")

			// addResult("ETH-BTC", "binance", "ethereum/bitcoin")
			// addResult("ETH-USDT", "binance", "ethereum/tether")
			//
			// addResult("XMR-BTC", "binance", "monero/bitcoin")
			// addResult("XMR-USDT", "binance", "monero/tether")
			//
			// addResult("SKY-BTC", "binance", "skycoin/bitcoin")
			// addResult("SKY-USDT", "binance", "skycoin/tether")
			//
			//
			// addResult("FUN-BTC", "binance", "funfair/bitcoin")
			// addResult("FUN-USDT", "binance", "funfair/tether")
			//
			// addResult("EVX-BTC", "binance", "evx/bitcoin")
			// // addResult("EVX-USDT", "binance", "evx/tether")
			//
			// addResult("ENG-BTC", "binance", "eng/bitcoin")
			// // addResult("ENG-USDT", "binance", "eng/tether")
			//
			// addResult("THETA-BTC", "binance", "theta/bitcoin")
			//
			// addResult("FUEL-BTC", "binance", "fuel/bitcoin")
			//
			//
			// addResult("QTUM-BTC", "binance", "qtum/bitcoin")
			//
			// addResult("XZC-BTC", "binance", "grin/bitcoin")




		} else if (symbolType==="bitmex") {

			addResult("XBT-USD", "bitmex", "bitcoin perp swap", "XBT-USD bitmex")
			addResult("XBT-Z19", "bitmex", "bitcoin december futures", "XBT-Z19 bitmex")
			addResult("XBT-H20", "bitmex", "bitcoin march futures", "XBT-H20 bitmex")
			addResult("---",  "---", "---", "---")
			addResult("ETH-USD", "bitmex", "ethereum perp swap", "ETH-USD bitmex")
			addResult("ETH-Z19", "bitmex", "ethereum december futures", "ETH-Z19 bitmex")
			addResult("---",  "---", "---", "---")

			addResult("ADA-Z19", "bitmex", "cardano december futures", "ADA-Z19 bitmex")
			addResult("BCH-Z19", "bitmex", "bcash december futures", "BCH-Z19 bitmex")
			addResult("EOS-Z19", "bitmex", "EOS december futures", "EOS-Z19 bitmex")
			addResult("LTC-Z19", "bitmex", "litecoin december futures", "LTC-Z19 bitmex")
			addResult("TRX-Z19", "bitmex", "tron december futures", "TRX-Z19 bitmex")
			addResult("XRP-Z19", "bitmex", "ripple december futures", "XRP-Z19 bitmex")




			// var result = [
			// 	{
			// 		"symbol": "XBT-USD",
			// 		"full_name": "XBT-USD bitmex", // e.g. BTCE:BTCUSD
			// 		"description": "bitcoin perp swap",
			// 		"exchange": "",
			// 		"ticker": "XBT-USD",
			// 		"type": "bitmex" // or "futures" or "bitcoin" or "forex" or "index"
			// 	},
			// 	{
			// 		"symbol": "ETH-USD",
			// 		"full_name": "ETH-USD bitmex", // e.g. BTCE:BTCUSD
			// 		"description": "ethereum perp swap",
			// 		"exchange": "",
			// 		"ticker": "ETH-USD",
			// 		"type": "bitmex" // or "futures" or "bitcoin" or "forex" or "index"
			// 	}
			// ]
		} else {
			result = []
		}

		var result2 = []

		for (let i = 0; i < result.length; i++) {
			if (result[i].symbol.includes(userInput)) {
				result2.push(result[i])
			}
		}

		onResultReadyCallback(result2)

	},
	resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
		//
		// if (!symbolName.includes(':')) return

		console.log("symbolname: " + symbolName)


		// let splitt = symbolName.split(":")

		// console.log("splitt1 " + splitt[1])

		// symbolName = splitt[1]

		// channelSymbolChange.postMessage(symbolName.includes(' ')?symbolName.split(' ')[0]:)

		// expects a symbolInfo object in response
		// console.log('======resolveSymbol running')
		// console.log('resolveSymbol:',{symbolName})
		var split_data0 = symbolName.split(' ')


		// console.log({split_data})
		var symbol_stub = {
			name: symbolName,
			description: '',
			type: 'crypto',
			session: '24x7',
			timezone: 'Etc/UTC',
			ticker: symbolName,
			exchange: split_data0[1],
			minmov: 1,
			// pricescale: symbolName.includes('binance')?100000000:100000000, //was 2
			pricescale: (symbolName.includes('XBT')||symbolName.includes('ETH-USD')?10:100000000),
			has_intraday: true,
			intraday_multipliers: ['1', '5', '60', '1D'],
			// seconds_multipliers:["1"],
			supported_resolution:  supportedResolutions,
			volume_precision: 1,
			data_status: 'streaming',
		}

		// if (split_data[2].match(/USD|EUR|JPY|AUD|GBP|KRW|CNY/)) {
		// 	// symbol_stub.pricescale = 100
		// }
		setTimeout(function() {
			onSymbolResolvedCallback(symbol_stub)
			// console.log('Resolving that symbol....', symbol_stub)
		}, 0)


		// onResolveErrorCallback('Not feeling it today')

	},
	getBars: function(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
		// console.log('=====getBars running')
		// console.log('function args',arguments)
		// console.log(`Requesting bars between ${new Date(from * 1000).toISOString()} and ${new Date(to * 1000).toISOString()}`)

		// if (!firstDataRequest) {return}

		historyProvider.getBars(symbolInfo, resolution, from, to, firstDataRequest)
		.then(bars => {
			if (bars.length) {
				onHistoryCallback(bars, {noData: false})
			} else {
				onHistoryCallback(bars, {noData: true})
			}
		}).catch(err => {
			console.log({err})
			onErrorCallback(err)
		})

	},
	subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
		// console.log('=====subscribeBars runnning')
		stream.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback)
	},
	unsubscribeBars: subscriberUID => {
		// console.log('=====unsubscribeBars running')

		stream.unsubscribeBars(subscriberUID)
	},
	calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
		//optional
		// console.log('=====calculateHistoryDepth running')
		// while optional, this makes sure we request 24 hours of minute data at a time
		// CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data
		return resolution < 60 ? {resolutionBack: 'D', intervalBack: '1'} : undefined
	},
	getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
		//optional
		// console.log('=====getMarks running')
	},
	getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
		//optional
		// console.log('=====getTimeScaleMarks running')
	},
	getServerTime: cb => {
		// console.log('=====getServerTime running')
	}
}
