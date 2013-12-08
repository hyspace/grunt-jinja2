#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""jinja2 shell
Usage:
  jinja2_shell.py (-t <template_file_path>) (-b <base_path>)
                  [-d <data_file_path>]
  jinja2_shell.py (-h | --help)
  jinja2_shell.py --version

Options:
  -h --help     Show this screen.
  --version     Show version.

"""


from docopt import docopt
import jinja2, json, sys

reload(sys)
sys.setdefaultencoding('utf-8')

def render(template_file_path=None, data_file_path=None, base_path=None):
  if not template_file_path or not base_path:
    sys.exit('command error.')
  env = jinja2.Environment(loader=jinja2.FileSystemLoader(base_path))
  template = env.get_template(template_file_path)
  if data_file_path:
    context = json.loads(open(data_file_path).read())
  else:
    context = {}
  print template.render(context)
  sys.exit()

if __name__ == '__main__':
  version='jinja2 shell 0.1'
  arguments = docopt(__doc__, version=version)
  if arguments['--version']:
    print version
    sys.exit()
  elif arguments['--help']:
    print __doc__
    sys.exit()
  elif arguments['-t'] and arguments['<template_file_path>']:
    render(template_file_path=arguments['<template_file_path>'],
      data_file_path=arguments['<data_file_path>'],
      base_path=arguments['<base_path>'])