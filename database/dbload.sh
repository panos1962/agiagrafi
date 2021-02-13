#!/usr/bin/env bash

progname="$(basename $0)"

[ -z "${AGIAGRAFI_BASEDIR}" ] && {
	echo "${progname}: AGIAGRAFI_BASEDIR: not set" >&2
	exit 2
}

usage() {
	echo "usage: ${progname} -p" >&2
	exit 1
}

errs=
mysqlopts=

while getopts ":p" opt
do
	case "${opt}" in
	p)
		mysqlopts="${mysqlopts} -p"
		;;
	?)
		echo "${progname}: -$OPTARG; invalid option" >&2
		errs=1
		;;
	esac
done

[ -n "${errs}" ] && usage

shift $(expr $OPTIND - 1)
[ $# -gt 0 ] && usage

datadir="${AGIAGRAFI_BASEDIR}/local/documents/NESTLE"
cd "${datadir}" 2>/dev/null || {
	echo "${progname}: ${datadir}: direcotry not found" >&2
	exit 4
}

mysql -u root ${mysqlopts} agiagrafi <"${AGIAGRAFI_BASEDIR}/database/dbload.sql"
