var jsPsychCustomDeblur = (function (jspsych) {
    "use strict";
  
    const info = {
      name: "jsPsychCustomDeblur",
      parameters: {
        stim_list: {
          type: jspsych.ParameterType.IMAGE,
          array: true,
          default: undefined,
        }
      },
    };

    /**
     * jsPsychCustomDeblur
     *     *
     * @author Kai, Liam, Rachel, Zephan
     * @see {@link https://DOCUMENTATION_URL DOCUMENTATION LINK TEXT}
     */
    class jsPsychCustomDeblur {
      constructor(jsPsych) {
        this.jsPsych = jsPsych;
      }
      
      trial(display_element, trial) {
        var img1 = trial.stim_list[0];
        var img2 = trial.stim_list[1];
        var img3 = trial.stim_list[2];

        display_element.innerHTML = `	
        <style>
          .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
        }

          .container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 50px;
          }
              
          .button {
            font-size: 16px;
            padding: 10px 20px;
            border: none;
            margin-top: 20px;
            border-radius: 5px;
            background-color: #4f5250;
            color: #fff;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .button:hover {
            background-color: #6f766f;
          }

          .image-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
          .image-wrapper img {
            max-width: 250px;
            filter: blur(10px);
            transition: filter 0.0s ease;
          }
          </style>
        
        <div class="container">

          <div class="image-wrapper">
            <img src=${img1} alt="Image 1">
            <button class="button" id="button1">Reduce Blur</button>
          </div>

          <div class="image-wrapper">
            <img src=${img2} alt="Image 2">
            <button class="button" id="button2">Reduce Blur</button>
          </div>

          <div class="image-wrapper">
            <img src=${img3} alt="Image 3">
            <button class="button" id="button3">Reduce Blur</button>
          </div>

        </div>

        <button class="button" id="continue">Continue</button>
      
      `

      const buttons = document.querySelectorAll('.button');
      const images = document.querySelectorAll('.image-wrapper img');
      const continueButton = document.querySelector('#continue');
      const blurStep = 1;

      var clicks = [0,0,0];


      buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
          let currentBlur = getComputedStyle(images[index]).getPropertyValue('filter').match(/blur\((\d+)px\)/)[1];
                  console.log(currentBlur);
                  clicks[index]++;
                  console.log(clicks);
  
                  let newBlur = currentBlur - blurStep;
          if (newBlur < 0) {
            newBlur = 0;
          }
          images[index].style.filter = `blur(${newBlur}px)`;
          button.innerHTML = `Reduce Blur`;
          button.disabled = (newBlur === 0) ? true : false;
        });
      });

        var trial_data = {
          count0: clicks[0],
          count1: clicks[1],
          count2: clicks[2],
          count: clicks
        };

      continueButton.addEventListener('click', () => {
        console.log(clicks[1]);
        this.jsPsych.finishTrial(trial_data);
      });
      }
    }
    jsPsychCustomDeblur.info = info;
  
    return jsPsychCustomDeblur;
  })(jsPsychModule);