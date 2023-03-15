FROM mysql:5.6

# Install libraries needed to build from source
RUN apt-get update && \
  apt-get install -y make libmariadb-dev libmariadbclient-dev libmariadbclient-dev-compat gcc g++ zlib1g-dev libpcre3-dev cmake default-libmysqlclient-dev mysql-server && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

# Create directory to store source
ARG SOURCE_DIR=/tmp/rathena
RUN mkdir -p "${SOURCE_DIR}"
WORKDIR ${SOURCE_DIR}

# Copy source code over and build
COPY . "${SOURCE_DIR}"
RUN ./configure
RUN make
