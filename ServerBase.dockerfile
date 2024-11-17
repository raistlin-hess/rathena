FROM ubuntu:20.04 as build
# Change this to define the client version supported by the server. Format is YYYYMMDD as specified in src/custom/defines_pre.hpp or src/config/packets.hpp
ARG CLIENT_VER=20240831

# Install libraries needed to build from source
RUN apt-get update && \
  apt-get install -y \
    g++ gcc make \
    libmariadb-dev libmariadbclient-dev libmariadbclient-dev-compat zlib1g-dev libpcre3-dev && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

# Create directory to store source
ENV SOURCE_DIR=/tmp/rathena
RUN mkdir -p "${SOURCE_DIR}"
WORKDIR ${SOURCE_DIR}

# Copy source code over and build
COPY . "${SOURCE_DIR}"

RUN ./configure --enable-packetver=${CLIENT_VER} && make

FROM ubuntu:20.04 as server
# Install libraries needed to run the server
RUN apt-get update && \
  apt-get install -y \
  libmariadb-dev libmariadbclient-dev libmariadbclient-dev-compat gcc g++ zlib1g-dev libpcre3-dev && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

ARG HOME_DIR=/opt/server
ENV HOME_DIR=${HOME_DIR}

# Create non-root user
RUN groupadd -g 9000 server && \
  useradd -r -u 9000 -g server server -M -d ${HOME_DIR}

# Create home dir and set ownership
RUN mkdir -p ${HOME_DIR} && \
  chown -R server:server ${HOME_DIR}

# Switch to non-root user and set working dir
USER server
WORKDIR ${HOME_DIR}

# Copy all server binaries
COPY --chown=server:server --from=build /tmp/rathena ${HOME_DIR}
RUN ls -al ${HOME_DIR}
RUN chmod +x *-server

# Copy config files
COPY --chown=server:server conf/ ./conf
COPY --chown=server:server db/ ./db
COPY --chown=server:server npc/ ./npc

# Embed startup script which auto restarts server on exit.
RUN printf '#!/bin/bash \n\
COUNTER=0 \n\
COUNTER_LIMIT=10 \n\
echo "Waiting 10 seconds for DBs to initialize..."\n\
sleep 10 \n\
\n\
until [ ${COUNTER} -gt ${COUNTER_LIMIT} ]; do \n\
  "${HOME_DIR}/${SERVER_NAME}" \n\
  EXIT=$? \n\
  if [ $EXIT -eq 0 ]; then \n\
    exit 0 \n\
  fi \n\
  DELAY=$((COUNTER * 5)) \n\
  echo "Restarting in ${DELAY} seconds..." \n\
  sleep ${DELAY} \n\
  ((COUNTER++)) \n\
done \n' > startupScript.sh

RUN chmod +x startupScript.sh

CMD ./startupScript.sh
