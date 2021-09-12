import React, { memo } from 'react'
import Styles from './icon-styles.scss'

export enum IconName {
  proposalViewed = 'https://e7.pngegg.com/pngimages/975/667/png-clipart-gray-eye-on-black-background-logo-circle-brand-angle-eye-icon-viewed-accomms-people-black.png',
  proposalSigned = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfDBBS8_R9oTuldfUWrAzn3UB2S5sAryYDZ9b5m-DADiiWOX2MccSM62NfZa3Jk_Tq4BQ&usqp=CAU',
  proposalCreated = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpHNF8oNPkQFVZs2WZaK-bk-18FS21wNvDIvfAiTjDNE7hyjNNoSXtv-ksC_MulOkHlIo&usqp=CAU',
  noIcon = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKSI2Fvtm5QSmnpzxgDvq20fKt3hFD6UMZNg&usqp=CAU'
}

type Props = {
  iconName: IconName
}

const Icon: React.FC<Props> = ({ iconName }: Props) => {
  return (
    <div className={Styles.iconWrap}>
        <img data-testid="icon" className={Styles.icon} src={iconName}/>
    </div>
  )
}

export default memo(Icon)
