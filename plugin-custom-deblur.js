var jsPsychCustomDeblur = (function (jspsych) {
  "use strict";

  const info = {
    name: "jsPsychCustomDeblur",
    parameters: {
      stim: {
        type: jspsych.ParameterType.IMAGE,
        default: undefined,
      }
    },
  };

  /**
   * jsPsychCustomDeblur
   *     *
   * @author Kai, Liam, Rachel, Zephan
   */
  class jsPsychCustomDeblur {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }
    
    trial(display_element, trial) {

      var img1 = trial.stim.image1;
      var img2 = trial.stim.image2;
      var img3 = trial.stim.image3;
      var img_array = [img1,img2,img3];

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
          width: 250px;
          height: 166px;
          filter: blur(0px);
          transition: filter 0.0s ease;
        }
        </style>

      <div id="header">
          <p id="click-tracker"><span class="click-tracker-label">Clicks remaining: </span><span id="clicks-remaining">10<br></span></p>
      </div>
      
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
      const buttons = document.querySelectorAll('.button:not(#continue)');
      const images = document.querySelectorAll('.image-wrapper img');
      const continueButton = document.querySelector('#continue');
      const blurStep = 1;
      const clicksRemainingElement = document.getElementById("clicks-remaining");

      // Set click limit per trial
      var totalClicks = 10;
      // Display click limit
      clicksRemainingElement.textContent = totalClicks;
      // Store base number of clicks and blur levels (updated below)
      var clicks = [0,0,0];
      var blurs = [trial.stim.blur1, trial.stim.blur2, trial.stim.blur3];
      var img_order = [];
      var frame_order = [];

      // Start with Continue button disabled, grayed out, and cursor not clicky
      continueButton.disabled = true;
      continueButton.style.opacity = "0.15";
      continueButton.style.cursor = "default";

      // Set three random values within easy, med, hard ranges
      var difficulty_asmts = jsPsych.randomization.shuffle(
        [jsPsych.randomization.randomInt(-1, 2),
        jsPsych.randomization.randomInt(3, 6),
        jsPsych.randomization.randomInt(7, 10)]);
    
      // Start with images at the pre-determined values
      images.forEach((image,index) => {
        blurs[index] += difficulty_asmts[index];
        images[index].style.filter = `blur(${blurs[index]}px)`;
      })

      // Function to disable and re-enable buttons after each click
      function resetButtons(newBlur) {
        buttons.forEach((button) => {
          button.disabled = true;
          button.style.opacity = "0.15";
          button.style.cursor = "default";
            if (totalClicks > 0){
              setTimeout(() => {
                button.disabled = (newBlur === 0) ? true : false;
                button.style.opacity = (newBlur === 0) ? "0.0" : "1.0";
                button.style.cursor = "pointer";
              }, 500);
              button.style.visibility = (newBlur === 0) ? "hidden" : "visible";
            } else {
              button.disabled = true;
              button.style.opacity = "0.0";
              button.style.visibility = "hidden";
              continueButton.disabled = false;
              continueButton.style.opacity = "1.0";
              continueButton.style.cursor = "pointer";
            }
        })
      }

      // For each button, add event listener that acts when it is pressed
      buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            let currentBlur = blurs[index];
            clicks[index]++;
            img_order.push(img_array[index]);
            frame_order.push(index);
            totalClicks--;
            clicksRemainingElement.textContent = totalClicks;

            let newBlur = currentBlur - blurStep;
              if (newBlur < 0) {
                newBlur = 0;
              }

              console.log(newBlur);
            
            blurs[index] = newBlur;
            images[index].style.filter = `blur(${newBlur}px)`;
            resetButtons.apply(button);
          }
        )
      });

      // Identify the data we want to store 
      var trial_data = {
        images: img_array,
        clicks: clicks,
        blur: blurs,
        orig_blur: [trial.stim.blur1, trial.stim.blur2, trial.stim.blur3],
        diff_asmts: difficulty_asmts,
        img_order: img_order,
        frame_order: frame_order
      };

      // When the Continue button is clicked, end the trial
      continueButton.addEventListener('click', () => {
        this.jsPsych.finishTrial(trial_data);
      });
    }
  }

  jsPsychCustomDeblur.info = info;

  return jsPsychCustomDeblur;
})(jsPsychModule);