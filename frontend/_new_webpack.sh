# initiate new package through npm
# -y defaults all values
npm init -y

# install webpack, with dev server
npm install webpack webpack-cli webpack-dev-server --save-dev

# create gitignore for node modules
echo "node_modules
dist" >> .gitignore

# install essential webpack plugins
npm install @babel/preset-env copy-webpack-plugin html-webpack-plugin mini-css-extract-plugin dotenv --save-dev

touch .env