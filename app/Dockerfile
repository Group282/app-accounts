FROM node:14
ENV PORT 80
ENV TZ=Europe/Kiev
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
EXPOSE ${PORT} 
WORKDIR /app
COPY package.json .
RUN npm i && npx browserslist@latest --update-db
COPY . .
CMD npm start --host=0.0.0.0