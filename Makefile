deploy: package
	sam package --template-file template.yml --output-template-file packaged.yml --s3-bucket sampack-97068
	sam deploy --template-file ./packaged.yml --stack-name samddbcase --capabilities CAPABILITY_IAM

package:
	cd src && npm install && npm pack && cd ..

delete:
	aws cloudformation delete-stack --stack-name samddbcase
