import React from 'react'
import Svg, { Defs, ClipPath, Circle, RadialGradient, Stop, G, Path, Ellipse } from 'react-native-svg'

const Usdt = (props) => {
  const { width, height, start, end, offsets, colors, ...others } = props
  let ratio = 1
  if (width && height) {
    ratio = Math.min(width / 256, height / 256)
  } else if (width) {
    ratio = width / 256
  } else if (height) {
    ratio = height / 256
  }
  return (
    <Svg width={256 * ratio} height={256 * ratio} {...others}>
      <Defs>
        <ClipPath id='prefix__a'>
          <Circle cx={128} cy={128} r={128} fill='none' />
        </ClipPath>
        <RadialGradient id='prefix__b' cx={128} cy={128} r={128} gradientUnits='userSpaceOnUse'>
          <Stop offset={0} stopColor='#130c0e' stopOpacity={0} />
          <Stop offset={0.613} stopColor='#130c0e' stopOpacity={0} />
          <Stop offset={0.805} stopColor='#130c0e' stopOpacity={0} />
          <Stop offset={0.93} stopColor='#130c0e' stopOpacity={0} />
          <Stop offset={1} stopColor='#130c0e' stopOpacity={0.1} />
        </RadialGradient>
      </Defs>
      <G scale={ratio}>
        <Circle cx={16} cy={16} r={16} fill='#26A17B' scale={256 / 32} />
        <Path
          scale={256 / 32}
          fill='#FFF'
          d='M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117'
        />
      </G>
      <Circle cx={128} cy={128} r={128} fill='url(#prefix__b)' scale={ratio} />
      <Ellipse cx={95} cy={60} rx={95} ry={60} transform='translate(33 6)' fill='#fff' opacity={0.3} scale={ratio} />
    </Svg>
  )
}

export default Usdt
