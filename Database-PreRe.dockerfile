FROM mysql:5.6

ARG MYSQL_INIT_DIR='/docker-entrypoint-initdb.d'

# Copy all scripts to director for baseimage to automatically execute at startup
COPY ./sql-files/ ${MYSQL_INIT_DIR}

# Remove RE scripts
RUN rm -f ${MYSQL_INIT_DIR}/**/*_re.sql && \
    rm -rf ${MYSQL_INIT_DIR}/clean_databases
