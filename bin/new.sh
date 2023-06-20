#!/bin/zsh

# must be run from project root
source ./bin/utils.sh

e_header "Creating new entry..."
e_question "What category? (a11y, css, gsap, lib, mixed, svg, waapi)"
read category
e_question "What number? (01, 02, etc)"
read id_number
e_question "What identifier? (dash-separated)"
read id_string
new_path="content/${category}/${id_number}-${id_string}"
new_date="$(date '+%Y-%m-%d')"
mkdir ${new_path}
cp _templates/* ${new_path}

# Prepend yaml, we have to rewrite the file back in tho :(
echo -e "---\ntitle:\ndescription:\ndate: ${new_date}\nnumber: ${id_number}\nidentifier: ${id_string}\ntags: ${category}\n---\n$(cat _templates/index.njk)" > "${new_path}/index.njk"

e_success "New entry created!"
