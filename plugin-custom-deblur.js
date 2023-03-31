var jsPsychCustomDeblur = (function (jspsych) {
    "use strict";
  
    const info = {
      name: "jsPsychCustomDeblur",
      parameters: {
        parameter_name: {
          type: jspsych.ParameterType.INT,
          default: undefined,
        },
        parameter_name2: {
          type: jspsych.ParameterType.IMAGE,
          default: undefined,
        },
      },
    };

    /**
     * jsPsychCustomDeblur
     *     *
     * @author YOUR NAME
     * @see {@link https://DOCUMENTATION_URL DOCUMENTATION LINK TEXT}
     */
    class jsPsychCustomDeblur {
      constructor(jsPsych) {
        this.jsPsych = jsPsych;
      }
      
      trial(display_element, trial) {
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
            max-width: 150px;
            filter: blur(15px);
            transition: filter 0.3s ease;
          }
          </style>
        
        <div class="container">

          <div class="image-wrapper">
            <img src="images/rachel.JPG" alt="Image 1">
            <button class="button" id="button1">Reduce Blur</button>
          </div>

          <div class="image-wrapper">
            <img src="images/family.JPG" alt="Image 2">
            <button class="button" id="button2">Reduce Blur</button>
          </div>

          <div class="image-wrapper">
            <img src="images/rachel_julia.JPG" alt="Image 3">
            <button class="button" id="button3">Reduce Blur</button>
          </div>

        </div>

        <button class="button" id="continue">Continue</button>
      
      `

      const buttons = document.querySelectorAll('.button');
      const images = document.querySelectorAll('.image-wrapper img');
      const continueButton = document.querySelector('#continue');
      const blurStep = 3;

      var clicks = [0,0,0];

  
      buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
          let currentBlur = getComputedStyle(images[index]).getPropertyValue('filter').match(/blur\((\d+)px\)/)[1];
                  console.log(currentBlur);
                  clicks[index]++;
  
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
          count2: clicks[2]
        };

      continueButton.addEventListener('click', () => {
        this.jsPsych.finishTrial(clicks);
      });
      }
    }
    jsPsychCustomDeblur.info = info;
  
    return jsPsychCustomDeblur;
  })(jsPsychModule);