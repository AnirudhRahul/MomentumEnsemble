# Momentum Ensemble
Momentum ensemble started out as a project aiming to find some alpha from interday stock returns, by predicting the direction of the next days return given data from teh past. I initially thought it would be interesting to see how external data such as Google Trends data, TV show ratings(specifically One Piece ratings since I started off working with the Toei Animation stock on TSE).
I quickly realized that a lot of techniques I initially thought would be effective at predicting daily data such as Nueral Networks, AdaBoost, etc. would be quite difficult to get working because of the huge variance between daily time bars, and often performed worse than random chance.

After reading some of *Advances in Financial Machine Learning* I realized that a lot of this daily variation could be resolved if I used tick data to create bars with nicer statistical properties such as volume bars. Unfortunately for the stocks I had intially started working with(Toei Animation on TSE) getting historical tick data was not very pratical.

So then I decided to take a less traditional approach, by trying to find the best ensemble of momentum indicators I could use to accurately predict the swing direction of a stock.

# Method Overview
1. Preprocess the data and generate all the momentum statistics availabe on Pandas-ta
2. Split the historical stock data into a training, val, test set to prevent any leaking of future information into the past
3. Find the top 20 momentum indicators based on the accuracy they acheive at predicting price swings on the training set
4. From these 20 indicators try all possible combinations of indicators to see which ensemble has the highgest accuracy on the training set
5. Test the ensembles performance on the validation and testing set
 
# Results
