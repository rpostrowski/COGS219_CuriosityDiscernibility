var jsPsychCustomDeblurPilot = (function (jspsych) {
    "use strict";
  
    const info = {
      name: "jsPsychCustomDeblurPilot",
      parameters: {
        stim: {
          type: jspsych.ParameterType.IMAGE,
          default: undefined,
        }
      },
    };

    /**
     * jsPsychCustomDeblurPilot
     *     *
     * @author Kai, Liam, Rachel, Zephan
     * @see {@link https://DOCUMENTATION_URL DOCUMENTATION LINK TEXT}
     */
    class jsPsychCustomDeblurPilot {
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
            transition: background-color 0.0s ease;
          }

          .button:hover {
            background-color: #6f766f;
          }
          .text-box-container {
            margin-top: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .text-box {
            width: 300px;
            height: 40px;
            padding: 10px;
            border: none;
            border-radius: 5px;
            background-color: #fff;
            box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
            font-size: 16px;
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
          .text-box-wrapper {
            position: relative;
          }
          
          .input-wrapper {
            position: relative;
          }
          
          .error-message {
            position: absolute;
            top: 100%;
            left: 0;
            color: red;
            font-size: 0.8em;
            margin-top: 5px;
          }
          </style>
        
        <div class="container">

          <div class="image-wrapper">
            <img src=${image1} id="image1" alt="Image">
            <button class="button" id="blurButton">Reduce Blur</button>
            <form>
              <input type="text" id="ourText" placeholder="Describe the image" required>
              <button type="submit" class="button" id="continueButton">Continue</button>
            </form>
          </div>
        </div>
      
      `
      // Create value IMG that refers to the image
      const img = document.querySelector('#image1');
      
      const blurStep = 1; // The value by which the blur is decremented with each click

      var clicks = 0; // Initialize number of clicks to begin

      function resetButton(newBlur) {
        blurButton.disabled = true;

        setTimeout(() => {
          blurButton.disabled = (newBlur === 0) ? true : false;
        }, 500);

      }

      blurButton.addEventListener('click', () => {  // When the button is clicked...
        let currentBlur = getComputedStyle(img).getPropertyValue('filter').match(/blur\((\d+)px\)/)[1];
          clicks++;

          let newBlur = currentBlur - blurStep;
           
            if (newBlur < 0) {
                newBlur = 0;
            }
            
            img.style.filter = `blur(${newBlur}px)`;
            blurButton.innerHTML = `Reduce Blur`;

          resetButton(newBlur);
      });

      const continueButton = document.getElementById("continueButton");
      
      continueButton.addEventListener('click', () => {
        const textBox = document.getElementById("ourText");
        const textBoxValue = textBox.value;
        var trialData = {
          finalBlur: getComputedStyle(img).getPropertyValue('filter').match(/blur\((\d+)px\)/)[1],
          clicks: clicks,
          stim: image1,
          label: textBoxValue
        };
        
      if (textBox.value !== '') {
        this.jsPsych.finishTrial(trialData);
      }

      });
      }
    }

    jsPsychCustomDeblurPilot.info = info;
  
    return jsPsychCustomDeblurPilot;
  })(jsPsychModule);