import { useEffect, useState } from 'react'

import { fetchBTCPrice, fetchUSDJPYRate } from '~utils'

function useCurrentPrice() {
  const [btcusd, setBtcUsd] = useState(0)
  const [jpyusd, setUsdJpy] = useState(0)
  let btcUsdTimer
  let usdJpyTimer

  useEffect(() => {
    async function updateBtcUsd() {
      const price = await fetchBTCPrice()
      setBtcUsd(price)
    }
    btcUsdTimer = setInterval(updateBtcUsd, 1000 * 5)

    async function updateUsdJpy() {
      const price = await fetchUSDJPYRate()
      setUsdJpy(price)
    }
    usdJpyTimer = setInterval(updateUsdJpy, 1000 * 60 * 60)

    updateBtcUsd();
    updateUsdJpy();

    return () => {
      clearInterval(btcUsdTimer)
      clearInterval(usdJpyTimer)
    }
  }, [])

  const btcjpy = btcusd * jpyusd
  const satsjpy = btcjpy * 0.00000001
  const jpysats = satsjpy > 0 ? 1.0 / satsjpy : 0
  const satsusd = btcusd * 0.00000001
  const usdsats = satsusd > 0 ? 1.0 / satsusd : 0

  return { btcusd, jpyusd, btcjpy, satsjpy, jpysats, satsusd, usdsats }
}

function IndexPopup() {
  const title = `Satoshi Now`
  const { btcusd, satsjpy, jpysats, satsusd, usdsats } = useCurrentPrice()
  const formattedBtcUsd = btcusd.toLocaleString('en-US', {
            style: 'currency', currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2});
  const formattedSatsUsd = satsusd.toLocaleString('en-US', {
            style: 'currency', currency: 'USD',
            minimumFractionDigits: 5,
            maximumFractionDigits: 5});

  return (
    <div
      style={{
        display: 'flex',
        width: 160,
        flexDirection: 'column',
        padding: 12,
        gap: '0.6rem',
        fontSize: '1.1em',
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#336'
      }}>
      <h2 style={{ margin: 0, padding: 0, color: 'yellow' }}>{title}</h2>
      <div>1 JPY = {jpysats.toFixed(2)} satoshi</div>
      <div>1 satoshi = {satsjpy.toFixed(4)} JPY</div>
      <div>1 USD = {usdsats.toFixed(2)} satoshi</div>
      <div>1 satoshi = {formattedSatsUsd}</div>
      <div>1 BTC = {formattedBtcUsd}</div>
    </div>
  )
}

export default IndexPopup
