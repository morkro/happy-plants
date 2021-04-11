import React, { useLayoutEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import anime from 'animejs'
import { spin, theme } from 'theme'
import { useAppStore } from 'store'

const pulse = keyframes`
  from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.15, 1.15, 1.15);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`

const IllustrationSvg = styled.svg`
  #welcome-illustration #Fill-127 {
    transform-origin: 25px 26px;
    animation: ${spin} 17s linear infinite;
  }

  #welcome-illustration #Fill-98 {
    transform-origin: 0 200px;
    animation: ${pulse} 1.5s linear infinite;
  }

  /** Disable animation if user has reduced motion enabled */
  @media (prefers-reduced-motion: reduce) {
    #welcome-illustration #Fill-127,
    #welcome-illustration #Fill-98 {
      animation: none;
    }
  }
`

export default function WelcomeIllustration() {
  const { store } = useAppStore()

  useLayoutEffect(() => {
    if (store.userPreferences.animations === 'enabled') {
      anime({
        targets: '#welcome-illustration #Group path',
        duration: 1000,
        translateY: anime.random(-4, 4),
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutQuad',
        delay: anime.stagger(100),
      })
    }
  }, [store.userPreferences.animations])

  return (
    <IllustrationSvg
      width="295px"
      height="308px"
      viewBox="0 0 295 308"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <g id="welcome-illustration" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Welcome" transform="translate(-33.000000, -65.000000)">
          <g id="Hero" transform="translate(33.000000, 65.000000)">
            <path
              d="M154.971522,151.592785 C155.847606,142.577349 155.510651,124.816536 164.585982,105.345355 C174.155514,84.7871903 204.953233,66.5132664 225.125626,79.1767356 C252.351619,96.2489014 238.850941,143.162475 260.910285,151.736816 C268.413157,154.657943 274.545745,156.107255 278.005153,166.092649 C280.700796,173.861317 280.723259,181.519711 277.713125,189.115092 C270.8617,206.302033 258.50667,220.106497 241.70383,223.00962 C234.380667,224.276642 225.170554,224.611964 215.780731,226.743172 C189.071404,232.803723 192.104002,265.494243 162.047585,268.563902 C155.533115,269.225544 147.580968,269.797167 141.583163,264.996886 C121.590479,249.018455 120.871641,224.290145 133.046961,201.139424 C141.62809,184.839174 152.747617,174.178635 154.971522,151.592785 Z"
              id="Fill-41"
              fill={theme.colors.white}
            />
            <path
              d="M64.8980954,96.2115693 C64.6910954,100.915569 63.9370954,104.272569 59.4170954,111.694569 C57.1110954,115.481569 54.0340954,118.370569 50.3210954,120.440569 C44.7540954,123.543569 37.3550954,120.300569 39.3250954,113.174569 C41.7520954,104.397569 50.1280954,106.856569 52.7250954,98.0545693 C54.4150954,92.3335693 54.3530954,89.7205693 56.3530954,88.0275693 C60.0590954,84.8885693 65.0880954,89.3175693 64.8980954,96.2115693"
              id="Fill-80"
              fill={theme.colors.white}
            />
            <path
              d="M126.040819,130.118532 C111.298135,139.870727 103.435867,141.121313 95.6437324,151.67406 C84.1942777,167.181624 82.6245101,170.263531 78.9104878,173.324645 C71.7256678,179.247848 63.8842909,180.56527 55.4355991,177.132843 C46.7765106,173.615755 40.5377291,161.463386 43.94884,148.208957 C49.6101499,126.215278 62.0444398,122.907612 74.3011609,107.34955 C79.3984289,100.878287 82.3514422,93.5084439 82.769251,84.9162348 C83.4735574,70.4706298 88.8826898,58.4950063 95.8899412,50.8489057 C107.032008,38.6950515 126.249723,42.8968422 132.561621,48.5215087 C142.051851,56.987471 143.320199,58.9717737 145.095887,65.759396 C150.646776,87.0223286 143.991677,118.237965 126.040819,130.118532"
              id="Fill-42"
              fill={theme.colors.white}
            />
            <path
              d="M256.069814,31.4059611 C255.737814,33.1209611 255.227814,40.2469611 248.293814,45.5979611 C241.116814,51.1379611 229.409814,45.9419611 231.179814,36.5739611 C232.676814,28.6499611 239.172814,19.5329611 246.285814,21.1989611 C247.847814,21.5649611 249.389814,22.0599611 250.909814,22.6029611 C253.495814,23.5259611 256.172814,27.9389611 256.069814,31.4059611"
              id="Fill-77"
              fill={theme.colors.white}
            />
            <path
              d="M261.995614,134.977959 C261.574097,132.372599 261.153269,129.766541 260.731064,127.161878 C260.693182,126.928833 260.634638,126.699974 260.6002,126.466929 C260.498265,125.778958 260.662188,125.224255 261.15258,124.668854 C264.880801,120.446132 269.317749,117.249089 274.477198,115.075629 C275.458672,114.66187 278.633135,113.325 279.671775,113.013808 C279.913527,112.941243 280.108444,113.167311 280.150458,113.396867 C281.586508,121.136895 282.22085,123.569216 281.931574,126.533912 C281.697398,128.934137 281.927441,130.148204 280.821304,130.47684 C280.029237,130.71128 277.037294,131.642065 275.550965,132.288172 C276.050311,132.528195 276.454609,132.459119 276.827224,132.52959 C281.114024,133.340364 281.385392,132.490517 281.536229,135.199143 C281.924686,142.196077 279.704835,147.720083 279.596012,148.121284 C279.463082,148.611097 279.180694,148.791812 278.730938,148.898566 C276.37678,149.458153 274.026065,150.038673 271.67604,150.615704 C271.229727,150.725249 270.786859,150.850842 270.058847,151.044813 C271.279318,151.226226 272.158855,151.374147 272.158855,151.374147 C277.852778,152.073282 277.706073,152.016765 278.110371,152.142358 C278.529822,152.272836 278.697878,152.631474 278.496762,153.035465 C277.825916,154.386289 277.077242,155.691063 276.167399,156.893268 C273.364173,160.595476 269.748908,162.995701 265.207959,163.926486 C263.561839,164.263494 261.912275,164.519564 260.159398,164.453977 C259.799181,165.859225 259.90456,166.193442 259.657297,167.067012 C259.143488,168.880438 256.900219,167.784987 256.916749,166.039939 C256.92157,165.518728 256.98218,164.488166 257.172965,163.618782 C257.076539,163.147808 256.74456,163.016633 256.492477,162.828243 C254.47443,161.321125 253.128607,159.316519 252.298659,156.951879 C251.43634,154.494439 250.734501,151.945596 251.098162,149.349306 C251.155329,148.941128 251.618171,148.75832 251.964614,148.987877 C252.509417,149.348608 253.039757,149.732365 253.574919,150.106353 C253.619687,150.327537 253.791187,150.407777 253.975773,150.411266 C254.129365,150.414754 254.073576,150.130077 253.838022,149.857958 C253.780856,149.793068 253.688563,149.759577 253.613489,149.710735 C253.074884,148.943221 252.529391,148.179196 251.999051,147.404705 C251.700821,146.970013 251.573402,146.486479 251.548607,145.945731 C251.344047,141.486476 252.205677,137.226077 253.86144,133.114994 C254.354587,131.889763 254.952425,130.711978 255.762398,129.667462 C256.073715,129.266959 256.466304,128.925066 256.851317,128.590151 C257.056566,128.412228 257.452599,128.490375 257.607568,128.713651 C257.792843,128.981583 257.955388,129.267657 258.111735,129.555823 C259.184124,131.542986 260.388064,133.447118 261.670523,135.301013 C261.762816,135.437072 261.83238,135.601041 261.9536,135.702213 C262.074821,135.802688 262.217393,135.693142 262.198108,135.564758 C262.167803,135.363112 262.065867,135.173326 261.995614,134.977959"
              id="Fill-540"
              fill={theme.colors.green}
              transform="translate(266.500000, 140.500000) rotate(-345.000000) translate(-266.500000, -140.500000) "
            />
            <path
              d="M26.1197819,260.115842 C26.2297819,257.087842 27.5197819,254.752842 29.4797819,252.665842 C33.3497819,248.549842 38.5197819,246.545842 43.8197819,245.305842 C50.3597819,243.777842 49.9297819,236.510842 56.6797819,232.709842 C61.9697819,229.737842 63.5297819,232.534842 67.2897819,234.392842 C71.7397819,236.592842 73.6397819,233.496842 76.3397819,231.698842 C78.9197819,229.975842 81.3197819,228.881842 82.9697819,231.862842 C83.6097819,233.027842 83.8297819,234.343842 83.7597819,235.657842 C83.3197819,243.568842 77.6397819,244.924842 71.5797819,245.963842 C63.7297819,247.313842 61.9197819,255.081842 59.0097819,260.095842 C56.9097819,263.719842 52.7797819,267.779842 48.8897819,266.135842 C48.2697819,265.873842 47.5997819,265.736842 46.9497819,265.580842 C45.8497819,265.318842 44.9597819,265.669842 44.3197819,266.684842 C41.9797819,270.370842 40.0297819,273.835842 35.9597819,274.146842 C31.8197819,274.463842 28.2097819,270.361842 26.7097819,266.358842 C25.6497819,263.540842 26.0797819,261.387842 26.1197819,260.115842"
              id="Fill-56"
              fill={theme.colors.white}
              transform="translate(54.886117, 252.082056) scale(-1, 1) translate(-54.886117, -252.082056) "
            />
            <path
              d="M4.36323282,197.863244 C-4.36276718,182.857244 13.2802328,168.547244 21.5472328,172.741244 C46.8802328,185.593244 17.4812328,220.420244 4.36323282,197.863244"
              id="Fill-69"
              fill={theme.colors.white}
            />
            <path
              d="M25.1656079,0.201404713 C25.7980091,0.132267165 26.4304104,0.0112764554 27.0641806,0.00159719867 C34.4435645,-0.109022879 36.5200856,5.56094746 37.134692,6.26615045 C37.3105872,6.07809632 37.5076993,5.91424033 37.6466359,5.71028456 C38.9757737,3.76544533 41.454732,2.34466871 44.5996281,4.20723426 C46.9191172,5.58168872 47.4974496,7.86461057 47.9026244,10.0431347 C48.2612589,10.2629921 48.4946451,10.0299986 48.7513015,9.9871333 C53.421763,9.19066874 56.2319791,12.9476031 54.4689209,16.5095696 C50.7717004,23.9784989 36.8657162,23.0098819 21.4191093,22.9020273 C19.0592395,22.8854343 14.3004883,22.3413218 12.0624447,21.1749714 C9.90174032,20.0501035 8.92507729,18.1889207 9.00446966,15.7511307 C9.01678916,15.3833189 9.07222694,15.0168899 9.10713221,14.6497696 C9.25222861,14.3656142 9.38363667,14.072471 9.54652791,13.7986863 C11.7982598,10.0189366 14.9397337,10.7448808 16.6165553,10.8914524 C16.6973165,10.3784518 16.7664427,9.83917895 16.8670519,9.30612845 C17.7020407,4.90967175 20.1857899,1.94228818 24.3922167,0.474498029 C24.6495575,0.384619216 24.9075827,0.292666277 25.1656079,0.201404713"
              id="Fill-209"
              fill={theme.colors.white}
            />
            <path
              d="M15.3763089,34.5252382 C13.1291334,34.2210677 10.8131768,34.1051239 9.52697096,32.9029955 C8.24715194,31.7066885 9.56136149,30.8591831 10.6829841,29.8268469 C12.8417268,27.841249 13.2043013,27.7272457 12.0468143,26.9326184 C10.7036184,26.0113747 9.93327052,25.6145462 9.42576455,24.6457607 C8.50360704,22.8838034 11.2553408,22.8154014 14.4723292,21.3813854 C14.5848354,20.8375654 14.311185,20.8011814 13.6666082,18.2504182 C13.5192203,17.6682737 13.6189528,17.0885548 13.8154701,16.5326068 C14.0409737,15.8961288 14.4831377,15.6036012 15.1675093,15.6506578 C15.9132925,15.7020806 18.5284467,16.5704462 19.0560957,16.6344821 C19.7252371,16.7154972 19.6574386,16.3875558 20.0750379,15.1179956 C20.5732093,13.6015092 20.6753983,13.3007345 20.9667353,12.8694624 C22.4347196,10.6932122 24.3266901,14.4451336 25.5283935,15.4027613 C26.5635485,16.2284363 27.9637343,13.4443301 30.4737518,12.1941748 C31.3973832,11.7342806 32.102389,12.1097639 32.2404424,13.1251209 C32.2458467,13.1629603 32.4271339,15.5322885 32.6320032,17.2762964 C32.8211511,18.8835003 33.6096768,17.9302387 35.6947256,17.7114494 C36.3412676,17.6440177 37.0000919,17.6483837 37.6510555,17.6750654 C38.4901844,17.7090238 38.8218074,18.5055915 38.6375724,18.9402594 C37.5783441,21.4391147 37.015322,21.7326126 36.6483259,23.2476437 C36.3928533,24.3013252 37.3459623,24.0592501 40.1473167,25.8013176 C40.2838962,25.8866988 40.4062283,25.9992467 40.5236473,26.1117947 C41.8825646,27.4196793 40.1232433,28.0314162 37.9001412,29.4372952 C36.0258573,30.6224444 36.3211245,30.9697906 36.7588669,31.8139001 C37.2319823,32.7264116 38.0318078,33.9624985 38.249942,34.5393067 C38.5751782,35.3984549 37.6490903,35.7365839 36.7264415,35.7802447 C32.0301689,36.006796 32.2355295,35.3955442 32.2360208,37.1856386 C32.2365121,38.1757694 32.356879,39.4419337 32.2777807,40.0929653 C32.1633094,41.0379799 31.0706731,41.1883672 30.2423526,40.724107 C29.4164886,40.2617872 28.5945549,39.7931609 27.7711474,39.326475 C26.0884678,38.3736985 26.9541266,38.323246 24.1173992,41.9665004 C23.3603162,42.9386817 22.4646885,43.4228319 21.6009949,42.5277847 C21.0645026,41.9713516 21.0394467,41.2257215 20.663116,39.7024433 C20.2391299,37.9870575 20.1845963,37.6149702 19.6230481,37.8027118 C18.4861954,38.1835313 17.0363889,39.2328468 15.6568374,39.4458146 C14.7238714,39.5903805 14.0842075,38.9936824 14.2586167,38.0865072 C14.4590643,37.0439834 14.9469186,35.6347086 15.3763089,34.5252382"
              id="Fill-127"
              fill={theme.colors.yellow}
            />
            <path
              d="M88.5841733,35.3733506 C80.9490008,41.8843506 84.2294147,49.1613506 78.7063062,49.0653506 C73.9511101,48.9823506 72.9280409,41.1053506 80.7145983,31.3933506 C86.2023022,24.5503506 98.4156481,20.2953506 107.090982,19.2113506 C113.952138,18.3553506 120.991537,20.2423506 123.740883,22.3063506 C126.342506,24.2583506 124.599138,28.0043506 121.365116,29.0983506 C113.72506,31.6843506 101.847447,24.0643506 88.5841733,35.3733506"
              id="Fill-85"
              fill={theme.colors.white}
            />
            <g id="Group" transform="translate(238.000000, 203.000000)" fill={theme.colors.blue}>
              <path
                d="M11.5850638,9.41241521 C13.6088121,9.80248685 15.6301263,10.1646274 17.7006103,10.1771483 C24.1803049,10.2156739 26.4099819,5.34700185 33.7416273,6.45172327 C39.0529322,7.25257407 41.9739064,9.22267666 47.8061184,5.85216871 C49.6073859,4.81005138 51.5011508,4.80427254 53.414389,5.40141925 C54.3880471,5.70625302 55.0988175,6.44305501 55.6684075,7.33203311 C56.3840462,8.44349651 56.1114219,10.8937243 53.1417647,10.5094315 C51.1214242,10.2474575 50.2597368,9.2828729 45.5618365,11.4850922 C40.1531658,14.0195947 36.7843088,11.8607167 31.6336575,11.3396581 C25.5336896,10.7232486 23.7080807,15.7758803 17.7006103,14.8970152 C12.2359542,14.0971275 9.52480329,12.1087253 5.81029768,13.6425255 C4.16919697,14.3200944 2.55779283,14.837782 0.994584772,13.942062 C-1.2677098,12.6456757 0.510676702,9.79285545 4.49634609,9.09650533 C7.63006465,8.54896032 8.45183208,8.80852651 11.5850638,9.41241521"
                id="Fill-58"
              />
              <path
                d="M19.2928068,22.9929612 C17.911811,22.9424372 13.7106004,22.5906934 12.3623251,21.9473535 C10.2104738,20.920993 10.0261806,16.955575 16.1578982,17.8010112 C21.4966259,18.5372191 23.7341278,19.7271813 27.4921686,17.0710586 C28.9597774,16.0302627 30.1771709,14.6357983 32.6071461,14.243154 C34.4356423,13.9472273 35.7973908,14.3971322 39.1223667,15.4711296 C44.2950862,17.1422735 48.5487457,12.2043874 54.4865465,14.73829 C56.1466286,15.4485141 57.8067106,16.9329595 56.5700698,18.282674 C55.6798809,19.2589916 54.2363312,19.1872955 52.9996904,18.8803016 C51.5850118,18.5285578 50.8776725,17.8900298 49.2368377,18.277381 C45.4499259,19.1685294 44.3672637,21.6504644 40.4263732,20.775195 C36.0042996,19.7935844 34.7002931,17.4497486 29.1041324,20.5408595 C25.8176511,22.3558767 23.2529446,23.0805363 19.2928068,22.9929612"
                id="Fill-61"
              />
              <path
                d="M12.225301,1.37855624 C13.423782,1.41794866 14.6212949,1.46540939 15.8202599,1.49436044 C18.4819913,1.55890704 20.3310209,0.730242588 23.6708911,0.149323177 C25.0213604,-0.0865566818 27.6835758,-0.171986007 28.6226118,0.899202809 C29.2228203,1.57694212 29.0921297,2.56317622 28.3370287,3.01452782 C28.1143706,3.14741788 27.8578299,3.22999956 27.6158103,3.31258124 C27.3786311,3.39184067 25.4569956,3.55890247 22.8480245,4.7022316 C21.1877702,5.42933008 19.4452292,5.8237288 17.6591247,5.98272226 C15.5937296,6.1659207 10.8094865,4.84034234 9.95515736,4.46065645 C8.54708743,3.83559856 8.91689335,2.7487477 9.65456904,2.03683666 C10.4275796,1.2917031 11.445998,1.32587483 12.2267532,1.32587483 C12.2262691,1.3434353 12.2257851,1.36099577 12.225301,1.37855624"
                id="Fill-89"
              />
              <path
                d="M36.9986353,27 C33.323057,26.3361817 33.0598319,26.0042726 31.5714142,26.3059616 C31.1933273,26.3822802 30.8056687,26.3776704 30.4227959,26.3838168 C29.2454622,26.4037928 28.4701449,24.6341229 29.4368986,23.9283038 C29.8676305,23.6132974 30.3031482,23.2680709 30.7817391,23.0775305 C32.0500051,22.5683983 33.3422006,22.1227795 34.6966129,22.0182896 C39.3150154,21.6638434 40.075975,26.5748695 37.649519,26.8924369 C37.4580826,26.9170227 37.2714321,26.9549259 36.9986353,27"
                id="Fill-108"
              />
              <path
                d="M43.4460932,0.867252336 C44.2794992,0.918217414 44.9873922,0.759326288 45.655121,1.64671824 C46.7546144,3.11021544 44.9974332,4.36835335 43.5766267,4.59719654 C42.5474206,4.76308288 41.5131939,4.93546476 40.4739467,4.99242573 C37.3110206,5.16580693 34.7053719,2.32225535 36.6934969,0.599435846 C38.285001,-0.775122294 39.1937147,0.608929341 43.4460932,0.867252336"
                id="Fill-109"
              />
            </g>
            <path
              d="M8.99183598,193.15335 C10.041836,190.81635 10.771836,188.92935 12.651836,187.10435 C18.581836,181.33835 17.921836,199.67435 14.721836,206.95335 C13.421836,209.93735 11.031836,209.70835 8.50183598,207.76935 C3.70183598,204.09235 0.51183598,198.27735 0.0318359803,194.19035 C-0.12816402,192.78435 0.31183598,191.57235 1.42183598,190.78835 C4.23183598,188.81835 5.37183598,190.87935 8.99183598,193.15335"
              id="Fill-98"
              fill={theme.colors.red}
            />
            <path
              d="M243.886259,291.75488 C243.936259,294.99188 243.566259,298.15488 242.226259,301.10888 C241.316259,303.11288 240.066259,304.80088 238.316259,305.99288 C235.306259,308.05388 233.116259,307.26088 231.816259,303.67188 C227.196259,290.87988 243.686259,278.35288 243.886259,291.75488"
              id="Fill-105"
              fill={theme.colors.white}
            />
            <path
              d="M55.6356599,80.4861788 C56.6636094,77.0233436 59.5168896,72.0935847 62.6878872,70.197367 C63.0200151,69.9993357 63.3912572,69.9688172 63.7673028,70.0251069 C65.2316847,70.2434839 65.2872681,72.0488242 64.4789073,72.8463749 C62.5581927,74.7419144 58.8807687,76.7914028 57.4678529,81.3705378 C57.9173234,82.0989133 59.5065964,83.1718089 59.6905019,86.5451231 C59.9073457,90.5505099 58.7318601,94.1469484 56.4652934,97.4375235 C55.0118909,99.5466926 53.0541207,101.043457 50.7662812,102.161113 C46.1219809,104.429656 40.9163571,104.216705 35.6050562,103.537837 C35.1082369,103.474088 34.6223969,103.300471 34.1420467,103.144488 C34.0624458,103.118716 34.015097,102.92272 34.0006865,102.800645 C33.9924519,102.728757 34.059701,102.611431 34.12695,102.575487 C34.9751112,102.125847 35.8514073,102.22961 37.3308859,100.719282 C43.7435612,94.1720414 42.3773079,87.3406393 49.0232962,82.2582878 C51.9026526,80.0562067 54.1500054,80.408187 55.6356599,80.4861788"
              id="Fill-553"
              fill={theme.colors.green}
            />
            <path
              d="M243.781807,50.3932882 C242.524688,48.9997206 241.879739,48.313107 242.018562,45.242694 C242.125572,42.8678246 244.071986,41.5670292 246.019846,40.2617688 C247.016672,39.5935112 247.181524,38.7516158 247.511711,37.5356549 C248.105565,35.351291 248.155695,34.6378876 251.837878,32.8057604 C254.101946,31.679595 253.156697,29.8692966 258.966053,27.1927935 C259.055228,27.1516165 259.142474,27.1044863 259.234541,27.0717431 C259.557015,26.9576383 259.910339,26.9814515 259.968663,27.1302839 C260.06796,27.3842912 259.909375,27.5842228 259.797545,27.7806816 C259.066796,29.0621288 258.313392,30.9761138 258.272902,32.5075994 C258.195296,35.4311644 258.726005,35.4723414 258.523073,38.3284356 C258.38666,40.2374595 257.46744,41.2420784 255.963042,42.6743425 C253.151877,45.3503495 254.720865,47.7872324 251.960313,49.8500498 C250.225025,51.1463803 248.311389,51.7407177 246.161079,51.3597067 C245.779316,51.292236 245.449129,51.0987539 245.211973,51.5507083 C243.900867,54.0525814 244.23009,55.7795337 243.901349,56.5594156 C243.585141,57.3105232 242.370922,57.1339088 242.245114,55.7770531 C242.026275,53.4101215 243.079016,51.6990447 243.781807,50.3932882"
              id="Fill-544"
              fill={theme.colors.green}
            />
            <g id="Logo" transform="translate(55.000000, 83.000000)">
              <g id="logo" transform="translate(14.000000, 0.000000)">
                <path
                  d="M100.065608,22.8837567 C115.638018,12.3460922 132.342507,6.12245859 143.206517,12.3984474 C164.934537,24.9504252 155.068731,82.7454304 142.397338,104.705701 C130.364058,125.560078 104.612577,133.487611 83.4415032,123.483601 C102.626756,118.110367 116.708001,100.336085 116.708001,79.2358278 C116.708001,64.8624847 110.173971,40.9691676 99.9440257,22.9662933 Z"
                  id="Combined-Shape"
                  stroke="#23221D"
                  strokeWidth="6"
                  fill={theme.colors.yellow}
                  strokeLinejoin="bevel"
                />
                <path
                  d="M11.4128752,50.185233 C17.5340446,46.6555694 25.9816026,48.1218099 34.7180608,52.21641 C31.8777564,62.0637512 30.2866022,71.4476953 30.2866022,78.5175832 C30.2866022,101.720695 47.4253724,120.883032 69.6290645,123.823953 C66.8760387,127.392792 63.3854833,130.499232 59.2263067,132.89755 C42.3747672,142.614687 20.9316218,137.025914 11.328725,120.413901 C1.72583711,103.801883 -5.43866069,59.9023763 11.4128752,50.185233 Z"
                  id="Combined-Shape"
                  stroke="#23221D"
                  strokeWidth="6"
                  fill={theme.colors.yellow}
                  strokeLinecap="round"
                  strokeLinejoin="bevel"
                  transform="translate(35.453892, 92.933024) rotate(1.000000) translate(-35.453892, -92.933024) "
                />
                <path
                  d="M73.9073555,0 C99.1715422,0 119.649914,55.0354211 119.649914,80.4149554 C119.649914,105.096722 100.2821,125.231546 75.9799669,126.320036 L75.9785271,106.489687 L95.843536,82.179611 L95.9455496,82.0439181 C96.5511392,81.1663093 96.3888342,79.9575134 95.5461322,79.2727441 C94.6590775,78.5519343 93.3540298,78.6847194 92.6312267,79.5693278 L92.6312267,79.5693278 L75.9785271,99.9482998 L75.9785271,75.9201702 L90.5631546,56.8328419 L90.6606786,56.693905 C91.2372603,55.7970769 91.03553,54.5941994 90.170893,53.9371874 C89.2607488,53.2455958 87.960735,53.420733 87.2672309,54.3283672 L87.2672309,54.3283672 L75.9785271,69.1029542 L75.9792053,25.2732717 L75.9735224,25.1190735 C75.8944305,24.0499929 74.9995951,23.2071356 73.9073555,23.2071356 C72.7631044,23.2071356 71.8355057,24.1321762 71.8355057,25.2732717 L71.8355057,25.2732717 L71.8348276,69.4552304 L60.276535,54.3283672 L60.1680851,54.1977326 C59.4540042,53.4053861 58.2375099,53.2801754 57.3728729,53.9371874 C56.4627287,54.628779 56.2871072,55.9252077 56.9806113,56.8328419 L56.9806113,56.8328419 L71.8348276,76.2734795 L71.8348276,100.019581 L55.0584327,79.4869552 L54.9457704,79.3599153 C54.2061698,78.5912023 52.9862292,78.5056022 52.1435272,79.1903715 C51.2564725,79.9111813 51.1233203,81.2126299 51.8461234,82.0972384 L51.8461234,82.0972384 L71.8348276,106.559935 L71.834744,126.320036 C47.5326107,125.231546 28.1647972,105.096722 28.1647972,80.4149554 C28.1647972,55.0354211 48.6431688,0 73.9073555,0 Z"
                  id="Combined-Shape"
                  fill={theme.colors.green}
                />
                <path
                  d="M73.9073555,126.366358 C99.1715422,126.366358 119.649914,105.79449 119.649914,80.4149554 C119.649914,55.0354211 99.1715422,0 73.9073555,0 C48.6431688,0 28.1647972,55.0354211 28.1647972,80.4149554 C28.1647972,105.79449 48.6431688,126.366358 73.9073555,126.366358"
                  id="Fill-3-Copy-2"
                  stroke="#23221D"
                  strokeWidth="6"
                />
              </g>
              <text
                id="HappyPlants"
                fontFamily="Asap-Bold, Asap"
                fontSize="32"
                fontWeight="bold"
                line-spacing="40"
                fill="#23221D"
              >
                <tspan x="1.936" y="167">
                  HappyPlants
                </tspan>
              </text>
            </g>
          </g>
        </g>
      </g>
    </IllustrationSvg>
  )
}
