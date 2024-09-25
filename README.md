# Malaria Cell Image Classification using TensorFlow

## Demo video of the application

![malariacellclassification](https://github.com/user-attachments/assets/3535bf28-373b-4560-b83c-dec7c7ee3780)

https://www.youtube.com/watch?v=Nx-q1x9u4Bw

## Introduction
This is a project which uses deep learning algorithm to detect malaria in cell images.

## Dataset used in this project

The dataset used in this project is taken from here: https://lhncbc.nlm.nih.gov/LHC-research/LHC-projects/image-processing/malaria-datasheet.html

## Models used in this project

1) Alexnet
2) InceptionV3
3) resnet101
4) MobileNetV3
5) Ensemble Learning Model based on InceptionV3 and MobileNetV3

**Out of the all the above models, MobileNetV3 proved to be the most effective one with a training accuracy of around 94.42% and testing accuracy of around 93.40%**

## About the web application of the deep learning model

The deep learning model of this project is connected with a frontend webapp created with the help of NextJS via FastAPI for real time prediction. The frontend of the project is deployed on Vercel and the backend of the project is deployed on HuggingFace Spaces.

## Regarding making successful payment with Razorpay

To complete a payment with Razorpay, follow these steps:

1. **Select the "Card" option.**
2. **Enter the card number:** `4111 1111 1111 1111`.
3. **Input the card expiry date:** Choose any date that is later than today.
4. **Enter the CVV:** You can use a number like `123` or `111`.
5. **Provide the OTP:** Enter a random 7-digit number, such as `8392653`.

Once you’ve completed these steps, your payment will be processed.

## Links

1) Live Preview: 
https://malaria-cell-classifier.vercel.app/
2) Backend FastAPI link of the model: https://som11-malaria-cell-classification.hf.space/
3) Swagger documentation of the FastAPI of the deep learning model: https://som11-malaria-cell-classification.hf.space/docs
4) NodeJS API of the project: https://malaria-cell-detect-backend-nodejs.onrender.com/

## Warning
While the model of this project can detect malaria in cell images correctly, but in some cases, the model may misclassify or fail to detect malaria altogether, therefore, it is strongly advised not to rely solely on the output of this model.
