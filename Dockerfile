# Use a imagem base apropriada
FROM node:20

# Defina o diretório de trabalho
WORKDIR /home/node/app

# Copie o arquivo package.json e package-lock.json
COPY package*.json ./

# Limpe o cache do npm e remova node_modules e package-lock.json
RUN npm cache clean --force && rm -rf node_modules package-lock.json

# Instale as dependências
RUN npm install

# Instale o CLI do NestJS globalmente
RUN npm install -g @nestjs/cli

# Copie o restante do código da aplicação
COPY . .

# Defina o usuário para node
USER node

# Comando para iniciar a aplicação
CMD ["npm", "start"]