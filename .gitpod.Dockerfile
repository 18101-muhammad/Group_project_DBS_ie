FROM gitpod/workspace-full:latest

RUN bash -c ". .nvm/nvm.sh     && nvm install 14.17.0     && nvm use 14.17.0     && nvm alias default 14.17.0"

RUN echo "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvm-fix