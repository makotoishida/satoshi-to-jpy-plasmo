/**
 * Get current BTC price in USD
 *
 * https://binance-docs.github.io/apidocs/spot/en/#symbol-price-ticker
 */
export async function fetchBTCPrice() {
  console.log(`Fetching BTC price...`)
  const res = await fetch('https://api.binance.us/api/v3/ticker/price?symbol=BTCUSD')
  const data = await res.json()
  const price = parseFloat(data['price'])
  console.log(`BTC = ${price}`)
  return price
}

/**
 * Get current USD/JPY rate
 *
 * https://www.exchangerate-api.com/docs/free
 */
export async function fetchUSDJPYRate() {
  console.log(`Fetching USD/JPY rate...`)
  const res = await fetch('https://open.er-api.com/v6/latest/USD')
  const data = await res.json()
  const rate = parseFloat(data['rates']['JPY'])
  console.log(`USDJPY = ${rate}`)
  return rate
}
