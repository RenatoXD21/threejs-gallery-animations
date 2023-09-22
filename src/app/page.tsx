import { ViewDisplayStyle, headerStyle, mainStyle } from './styles'
import RollXScene from './scenes/rollXScene'

export default function Home() {
  return (
    <main style={mainStyle}>
      <header style={headerStyle}>
        Gallery animations using ThreeJS
      </header>

      <div id='ViewDisplay' style={ViewDisplayStyle}>
        <RollXScene />
      </div>
    </main>
  )
}
