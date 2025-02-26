FROM node:23.8
RUN mkdir -p /usr/src/real-time-inventory-management-system
WORKDIR /usr/src/real-time-inventory-management-system
COPY . .
RUN npm i
RUN npm cache clean --force
RUN npm run build

EXPOSE 3000 

CMD ["npm", "run", "start"]