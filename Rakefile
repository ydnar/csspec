require 'rubygems'
require 'rake'

desc "Build JavaScript files by default"
task :default => [:build]

desc "Build JavaScript files"
task :build do
  filenames = [
    "lib/jquery.min.js",
    "lib/csspec/base.js",
    "lib/csspec/context.js",
    "lib/csspec/example.js",
    "lib/csspec/example-group.js",
    "lib/csspec/matchers.js",
  ]
  
  File.open("lib/csspec.js", "w") do |output|
    filenames.each do |filename|
      File.open(filename) do |input|
        data = input.read
        output.puts "\n/*\n#{filename}\n*/\n\n"
        output.puts data
      end
    end
  end
end
