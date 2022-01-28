import React from 'react'
import styled from 'styled-components'
import { spin } from 'theme'
import BaseSVG from './BaseSVG'
import { Heading } from './Typography'

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`

const Illustration = styled(BaseSVG)`
  transform: translateX(10px);
  margin-bottom: ${(props) => props.theme.spacings.m};

  & #Fill-531 {
    transform-origin: 41px 78px;
    animation: ${spin} 17s linear infinite;
  }

  & #Fill-150 {
    transform-origin: 25px 10px;
    animation: ${spin} 9s linear infinite reverse;
  }
`

const LoadingTitle = styled.div`
  position: relative;

  & h2 {
    position: relative;
    z-index: 1;
  }

  & svg {
    position: absolute;
    z-index: 0;
    width: calc(100% + 2 * ${({ theme }) => theme.spacings.m});
    top: 50%;
    transform: translateY(-50%);
    left: calc(-1 * ${({ theme }) => theme.spacings.m});
  }
`

export type AuthLoaderType = 'login' | 'logout'

export default function AuthLoader(props: { message?: AuthLoaderType }) {
  let title = 'Waiting'
  if (props.message === 'login') {
    title = 'Logging you in'
  } else if (props.message === 'logout') {
    title = 'Logging you out'
  }

  return (
    <Overlay data-cy="app-overlay-loading">
      <Illustration width="102px" height="127px" viewBox="0 0 102 127">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="2.1.-Login--Loading" transform="translate(-138.000000, -274.000000)">
            <g id="Group-5" transform="translate(138.000000, 274.000000)">
              <path
                d="M56.8486349,67.7680927 C59.6586082,66.8495688 62.5052394,66.0864874 65.4251866,65.59755 C66.8647164,65.3573207 68.2647683,65.3191666 69.6464913,65.8660416 C71.7430444,66.6927131 72.3126526,68.7487936 70.8421046,70.4671398 C70.2259689,71.1864147 69.4660213,71.7855749 68.7469614,72.4115843 C68.3268048,72.7789938 67.8558911,73.0927051 67.4159956,73.4233737 C67.534429,74.1709108 68.1435151,73.9730749 68.503045,74.1553666 C68.8386063,74.3249402 69.2192851,74.4069008 69.5830448,74.5199499 C70.7673788,74.8873594 71.9587623,75.2335723 72.9922347,75.9584996 C74.2935921,76.869958 74.3387096,78.2901372 73.1036185,79.3118184 C69.5844547,82.2242457 59.5965716,80.9397254 55.5233088,82.0490196 C55.5388179,82.6100258 55.9829431,82.5648061 56.2846663,82.6693766 C60.7357881,84.2124967 63.1876414,84.7890471 67.4033063,87.112206 C70.5587104,88.8503358 70.7518696,92.0679957 67.8601209,92.7816181 C66.9197033,93.0133688 65.6465443,92.9554311 64.2944297,92.9554311 C63.805187,93.4245849 64.0209049,93.762319 64.2098344,94.0689647 C64.7216359,94.9027018 65.6127062,96.011996 65.90315,97.043569 C66.1653954,97.9790503 66.3233066,98.9540988 65.5605391,99.7454424 C64.8034113,100.531134 63.8094167,100.509937 62.8859182,100.196226 C61.9003832,99.8584915 60.916258,99.4387968 60.0364671,98.8862693 C58.2162586,97.7458865 53.5578783,94.7698691 49.6453465,91.9775565 C49.205451,92.643133 49.690464,92.9921721 49.8906728,93.3694734 C51.6685837,96.7044218 55.1539093,102.195782 55.0284263,105.956077 C54.9466509,108.417721 52.6061814,109.271242 49.8032577,107.681489 C48.9798636,107.216575 48.183258,106.70644 47.412031,106.2387 C46.4222662,106.916994 46.7958954,107.941502 46.2361566,110.63631 C45.6891071,113.270354 43.3909352,115.642971 41.2393952,112.50162 C38.4914584,108.491203 38.2701008,94.6116004 38.1276987,93.9318927 C37.8837823,94.0901614 37.5496309,94.1820138 37.4847746,94.3685448 C36.6754797,96.657789 35.4192397,100.907022 32.9335483,106.724811 C32.5641489,107.588223 31.9917208,108.38522 31.4023737,109.124278 C30.267387,110.55011 27.7408079,110.650441 27.093654,108.943399 C25.5385107,104.84537 27.2628445,101.88631 24.9195552,102.868424 C23.0880673,103.638571 21.765561,104.424262 19.7775719,104.37339 C18.4099481,104.338062 17.4906794,102.991365 18.0490083,101.73652 C20.4458746,96.3483171 25.084516,91.6384092 28.9871784,87.6082089 C28.6769957,87.0330716 28.2878574,87.187101 27.9692151,87.2775403 C17.3341781,90.3100823 14.5171552,90.1645316 11.4251976,90.1065939 C7.96666046,90.0415907 5.30190904,85.9054069 12.8689571,82.5746979 C13.7191397,82.2002228 14.7159541,82.078695 15.3701576,81.3142005 C15.1445702,80.6062306 14.4762675,80.6726469 14.0250926,80.4295913 C12.2669207,79.4799789 11.0966859,79.2779037 9.81647731,78.0583866 C8.13726094,76.4643943 7.90462391,73.8826356 14.6609672,73.4290261 C17.6979379,73.2255377 20.7377284,73.2608656 23.7789288,73.8571996 C23.6562656,73.2085804 23.2163701,73.0135707 22.8103128,72.7606233 C16.9746482,69.1190293 17.0395046,69.2688194 13.9771553,66.4722674 C11.7607589,64.4486886 11.3758504,59.9860755 15.1614893,59.6850823 C16.8759537,59.5480103 19.5576242,60.4524031 20.0736554,60.5965407 C20.5939164,60.1711934 20.1808094,59.8348724 20.0905744,59.5268136 C19.6845171,58.1476146 18.9880159,56.9436418 19.0458227,55.3962823 C19.1036295,53.8743588 20.4980417,52.9289858 21.8473365,53.5747787 C26.2956385,55.7015148 28.9124525,60.3732687 31.9466034,63.8650726 C32.2849845,63.1246011 32.0086399,62.6003359 31.8620081,62.0520478 C29.1084316,51.7772981 29.477831,53.4320542 29.2889016,49.7735029 C29.2127658,48.2982122 30.5860292,45.4536143 32.8249844,46.6491085 C34.0417465,47.2991408 34.8834696,48.3109302 35.6166287,49.4597916 C36.0071769,50.0702568 36.0720333,50.9619315 37.0364196,51.2389018 C37.369161,50.3613582 37.6511453,49.4668572 38.0445133,48.6246415 C40.4484293,43.4639502 45.2435719,45.026854 43.8928673,61.3765794 C44.4864442,61.4726712 44.56117,60.9724289 44.7486895,60.6120849 C48.7542762,52.919094 47.8025792,54.4466699 50.4461818,51.0509577 C51.0453984,50.2822238 51.8293147,49.725457 52.7499934,49.4117458 C54.2304108,48.9058511 55.5670163,49.6731718 55.6403322,51.2177051 C55.6882696,52.2224289 55.5980346,54.3943847 55.1299407,57.132999 C56.7090526,56.3049144 59.1792349,55.0090891 60.9247176,54.1810045 C62.2951612,53.5295591 64.4974584,53.7429392 64.737145,55.3383446 C64.8541685,56.1169703 64.7822625,56.8800516 64.3705654,57.5583462 C63.7783985,58.5348078 63.2031505,59.5324661 62.5052394,60.4297932 C60.6258142,62.8490439 58.5081123,65.0520881 56.2127603,67.0813194 C55.3357892,67.7073288 55.3357892,67.7073288 54.7506718,68.8406459 C55.5853453,68.3785578 56.3579822,68.4266036 56.8486349,67.7680927"
                id="Fill-531"
                fill="#F8C559"
              />
              <path
                d="M51.9876992,78.8626604 C52.2642152,84.2142138 47.8550918,89.9460598 41.1512982,89.9996028 C34.6552356,90.0517729 30.0879065,84.9569512 30.0012373,79.1358669 C29.910441,73.0662882 34.828574,68.0414843 40.8706551,68.0002973 C47.1493569,67.9549917 52.0963797,73.0937461 51.9876992,78.8626604"
                id="Fill-532"
                fill="#DE4A4D"
              />
              <path
                d="M101.998301,123.137873 C102.035295,124.501559 101.467651,125.535888 100.341114,126.264544 C97.1794908,128.309518 94.5162966,125.655789 95.0743939,123.588611 C95.805927,120.878262 97.7141186,117.979551 99.9317897,119.352118 C101.335585,120.221769 101.960113,121.513292 101.998301,123.137873"
                id="Fill-95"
                fill="#FFFFFF"
              />
              <path
                d="M11.0685929,114.108793 C14.3608957,114.926706 15.0659016,115.096767 15.7878095,115.316065 C16.66346,115.582008 17.3557894,116.074376 16.8012758,116.801266 C16.5344202,117.151106 16.1840299,117.40474 15.801136,117.615292 C14.9654651,118.073971 14.0979406,118.462682 13.2086385,118.807339 C12.6645261,119.018539 12.1356904,119.268286 11.5928781,119.483049 C11.0315387,119.705586 11.1628537,119.951446 10.6918747,122.132439 C9.94233867,125.605573 8.56613074,128.952052 7.15904427,125.637642 C6.63345896,124.400245 5.73473082,120.701982 5.64014497,120.286709 C5.56148594,119.940108 5.38369054,119.778469 5.04890212,119.703642 C2.35629313,119.10114 1.26189254,118.813818 0.51268156,118.391418 C-0.143893787,118.021495 -0.176072479,117.18609 0.452224622,116.803209 C0.820166846,116.579052 1.20468597,116.376599 1.59700599,116.197792 C5.39246655,114.469323 5.51468057,114.610878 5.60634109,113.950717 C5.79648791,112.577919 6.4098333,109.03093 7.07550969,107.801631 C7.47595564,107.062432 8.18388688,106.704494 8.80178279,107.297926 C9.30689075,107.782843 9.30429045,108.100614 10.8218896,113.410085 C10.886572,113.636509 10.9782325,113.854511 11.0685929,114.108793"
                id="Fill-154"
                fill="#FFFFFF"
              />
              <path
                d="M30.9495331,9.10427716 C33.9541144,11.8036311 34.5913323,12.3137154 34.5913323,12.3137154 C35.3669445,13.0305335 34.9862521,13.3739649 33.8903064,14.7122504 C33.6415414,15.0156008 33.3401779,15.0793086 32.9728507,14.9059052 C32.6650201,14.7603477 32.7546962,14.8012726 28.8499045,13.2351579 C28.6076065,13.5330234 28.7119413,13.1971863 28.0380769,19.0241288 C27.9902209,19.4367528 27.8841616,19.8177338 27.4801879,19.8776444 C26.8024434,19.978058 26.1208186,20.1046298 25.3809905,19.8531739 C25.0904054,18.8587417 24.7536888,15.3915189 24.3583378,13.2528779 C23.3218887,13.5224758 24.5027681,13.1541519 19.2993971,15.6079567 C19.0583925,15.7214494 18.8316154,15.6771492 18.6764067,15.4847601 C18.2849359,15 17.9072615,14.5042508 17.5433834,13.9992295 C17.2303792,13.5650883 17.7576576,13.2950685 18.0378955,13.0862251 C21.6210603,10.4172483 20.7467181,11.0847035 21.4102352,10.4817999 C21.1756976,10.0873179 21.0601534,10.1493381 18.2392356,7.82210512 C17.9102794,7.55081962 17.6015866,7.25379786 17.3028099,6.95044752 C16.9656622,6.60828183 16.901423,6.20831503 17.1536371,5.79189391 C18.3422769,3.83003145 18.3655582,3.73721215 19.0540812,4.02874913 C21.0049681,4.8552628 22.6221563,5.68894887 23.4878758,5.90496469 C23.6370486,5.08351389 23.8909872,1.55469291 23.9780765,1.08679926 C24.0647347,0.621858957 24.3449726,0.318508611 24.8162034,0.232017901 C26.9917117,-0.165417461 27.2232313,-0.0873648684 27.3659371,0.741258327 C27.3659371,0.741258327 27.8410481,3.67181674 28.1350823,5.47546448 C28.3472009,5.5843162 28.4588649,5.42061671 28.5877743,5.32400026 C32.7202054,2.21581946 32.3770218,2.1398764 33.4186445,3.11025998 C33.7092296,3.38070166 33.9830005,3.67097293 34.2481486,3.96672896 C34.6245297,4.38610343 34.5589971,4.2620631 30.9495331,9.10427716"
                id="Fill-150"
                fill="#FFFFFF"
              />
            </g>
          </g>
        </g>
      </Illustration>

      <LoadingTitle>
        <Heading as="h2" color="white" size="l">
          {title}
        </Heading>
        <BaseSVG width="173px" height="30px" viewBox="0 0 173 30">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" fillOpacity="0.5">
            <g transform="translate(-93.000000, -433.000000)" fill="#000000">
              <g transform="translate(93.000000, 427.000000)">
                <path d="M37.4867852,35.7886378 C30.1736841,35.7886378 22.860583,35.7554237 15.5414078,35.7976962 C10.7976105,35.8278908 7.90031047,34.5265035 6.47291947,32.2105777 C5.91411108,31.2896425 0.921279573,18.3452176 0.57506133,17.3910683 C-2.65023493,8.67388735 8.11290062,11.2766618 22.3139226,11.5302965 C142.955795,13.6680741 163.042527,0.509267618 167.926027,8.73427655 C171.054139,14.0002147 172.402568,19.4563789 172.96745,24.9548155 C173.234707,27.5757067 171.9045,28.6294982 167.178924,29.2333902 C148.051885,31.6791528 158.529542,30.9091905 37.5535993,36 C37.5293033,35.927533 37.5110813,35.8580854 37.4867852,35.7886378" />
              </g>
            </g>
          </g>
        </BaseSVG>
      </LoadingTitle>
    </Overlay>
  )
}