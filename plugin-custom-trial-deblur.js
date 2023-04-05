var jsPsychCustomTrialDeblur = (function (jspsych) {
    "use strict";
  
    const info = {
      name: "jsPsychCustomTrialDeblur",
      parameters: {
        stim: {
          type: jspsych.ParameterType.IMAGE,
          default: undefined,
        }
      },
    };

    /**
     * jsPsychCustomTrialDeblur
     *     *
     * @author Rachel, Zephan, Kai, Liam
     * @see {@link https://DOCUMENTATION_URL DOCUMENTATION LINK TEXT}
     */
    class jsPsychCustomTrialDeblur {
      constructor(jsPsych) {
        this.jsPsych = jsPsych;
      }
      
      trial(display_element, trial) {
        var image1 = trial.stim;

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
            filter: blur(35px);
            transition: filter 0.3s ease;
          }
          </style>
        
        <div class="container">

          <div class="image-wrapper">
            <img src=${image1} id="image1" alt="Image">
            <button class="button" id="blurButton">Reduce Blur</button>
          </div>

        </div>

        <button class="button" id="continueButton">Continue</button>
      
      `
      // Create value IMG that refers to the image
      const img = document.querySelector('#image1');
      
      const blurStep = 3; // The value by which the blur is decremented with each click

      var clicks = 0; // Initialize number of clicks to begin
  
      blurButton.addEventListener('click', () => {  // When the button is clicked...
        let currentBlur = getComputedStyle(img).getPropertyValue('filter').match(/blur\((\d+)px\)/)[1];
                console.log(currentBlur);
                clicks++;
                console.log(clicks);

                let newBlur = currentBlur - blurStep;
        if (newBlur < 0) {
          newBlur = 0;
        }
        img.style.filter = `blur(${newBlur}px)`;
        blurButton.innerHTML = `Reduce Blur`;
        blurButton.disabled = (newBlur === 0) ? true : false;

        // add click delay or pop up to slow clicks and avoid error, OR MAKE LOADING DEBLUR BUTTON
      });

      continueButton.addEventListener('click', () => {
        console.log(`continue: ` + clicks);
        var trial_data = {
          clicks: clicks,
          stim: image1
        };
        this.jsPsych.finishTrial(trial_data);
      });
      }
    }

    jsPsychCustomTrialDeblur.info = info;
  
    return jsPsychCustomTrialDeblur;
  })(jsPsychModule);